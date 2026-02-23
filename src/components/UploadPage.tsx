import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ethers } from 'ethers';
import axios from 'axios';
import { CONTRACT_ABI } from '../lib/abi';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL  || 'http://localhost:3000';

export const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'summarizing' | 'signing' | 'confirming' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    category: 'Biology',
    abstract: ''
  });

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setStatus('idle');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setErrorMsg('');

    try {
      setStatus('uploading');
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('author', formData.authors);
      uploadFormData.append('category', formData.category);

      const { data } = await axios.post(`http://localhost:3000/storage/upload`, uploadFormData);
      const { rootHash, summary } = data;

      setStatus('signing');
      if (!(window as any).ethereum) throw new Error('MetaMask not installed');
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();


      const contract = new ethers.Contract("0xB17A4a82Dab596356DaB37A8338E49F44c2bDdCA", CONTRACT_ABI, signer);

      const tx = await contract.addRecord(
        formData.title,
        formData.authors,
        formData.category,
        rootHash,
        summary,
        file.name
      );

      setStatus('confirming');
      await tx.wait();

      setStatus('success');
    } catch (error: any) {
      setErrorMsg(error.message);
      setStatus('error');
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'uploading':
        return <><Loader2 className="size-6 animate-spin" /> Uploading to 0G Storage...</>;
      case 'summarizing':
        return <><Loader2 className="size-6 animate-spin" /> Generating AI Summary...</>;
      case 'signing':
        return <><Loader2 className="size-6 animate-spin" /> Confirm in MetaMask...</>;
      case 'confirming':
        return <><Loader2 className="size-6 animate-spin" /> Confirming on Chain...</>;
      case 'success':
        return <><CheckCircle2 className="size-6" /> Submitted Successfully</>;
      default:
        return <><Upload className="size-6" /> Submit to ResearchChain</>;
    }
  };

  const isLoading = ['uploading', 'summarizing', 'signing', 'confirming'].includes(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Submit Research</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Upload your manuscript for on-chain verification and semantic indexing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File Upload Zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center ${
            isDragging
              ? 'border-accent-teal bg-accent-teal/5'
              : 'border-slate-200 dark:border-slate-700 hover:border-accent-teal/50'
          } ${file ? 'bg-slate-50 dark:bg-slate-900/50' : ''}`}
        >
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="size-16 bg-accent-teal/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="size-8 text-accent-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Drag & drop your file</h3>
                <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium shadow-sm">
                  Select Manuscript
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="file"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center w-full"
              >
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-md shadow-sm">
                  <div className="size-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="size-6 text-red-600" />
                  </div>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="size-5 text-slate-400" />
                  </button>
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-green-600 font-medium"
                  >
                    <CheckCircle2 className="size-5" />
                    Upload Successful!
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-red-600 font-medium text-sm text-center"
                  >
                    <AlertCircle className="size-5 shrink-0" />
                    {errorMsg}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Metadata Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Title</label>
            <input
              type="text"
              required
              placeholder="Enter paper title"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent-teal outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Authors</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Jane Doe, John Smith"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent-teal outline-none transition-all"
              value={formData.authors}
              onChange={(e) => setFormData({...formData, authors: e.target.value})}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</label>
            <select
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-accent-teal outline-none transition-all"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Biology</option>
              <option>Physics</option>
              <option>AI & ML</option>
              <option>Quantum Computing</option>
              <option>Medicine</option>
              <option>Environment</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
        >
          {getButtonContent()}
        </button>
      </form>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4">
        <div className="size-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
          <AlertCircle className="size-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-1">On-Chain Verification</h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            By submitting, your research will be cryptographically hashed and stored on the ResearchChain ledger. This establishes immutable proof of discovery and enables citation tracking.
          </p>
        </div>
      </div>
    </motion.div>
  );
};