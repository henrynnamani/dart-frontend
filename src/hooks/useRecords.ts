import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI } from '../lib/abi';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS!;
const RPC_URL = import.meta.env.VITE_RPC_URL!;

export interface ResearchRecord {
    id: string;
    title: string;
    author: string;
    category: string;
    fileRootHash: string;
    summary: string;
    fileName: string;
    timestamp: string;
    walletAddress: string;
}

export const useRecords = () => {
    const [records, setRecords] = useState<ResearchRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const walletAddress = localStorage.getItem('walletAddress');

            // if (!walletAddress) {
            //     setRecords([]);
            //     return;
            // }
            

            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

            const raw = await contract.getUserRecords(walletAddress);

            const mapped: ResearchRecord[] = raw.map((r: any, index: number) => ({
                id: `${walletAddress}-${index}`,
                title: r.title,
                author: r.author,
                category: r.category,
                fileRootHash: r.fileRootHash,
                summary: r.summary,
                fileName: r.fileName,
                timestamp: Number(r.timestamp) * 1000,
                walletAddress,
            }));

            setRecords(mapped.reverse()); // newest first
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return { records, loading, error, refetch: fetchRecords };
};