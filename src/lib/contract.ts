// lib/contract.ts
import { ethers } from 'ethers';
import { CONTRACT_ABI } from './abi';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export const getContract = async () => {
    if (!window.ethereum) throw new Error('MetaMask not installed');

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();

    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export const addRecord = async (
    title: string,
    rootHash: string,
    summary: string,
    fileName: string
) => {
    const contract = await getContract();
    const tx = await contract.addRecord(title, rootHash, summary, fileName);
    const receipt = await tx.wait();
    return receipt.hash;
}

export const getMyRecords = async () => {
    const contract = await getContract();
    const records = await contract.getMyRecords();
    return records.map((r: any) => ({
        title: r.title,
        fileRootHash: r.fileRootHash,
        summary: r.summary,
        fileName: r.fileName,
        timestamp: new Date(Number(r.timestamp) * 1000).toISOString()
    }));
}