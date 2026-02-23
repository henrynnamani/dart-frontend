import React, { useState, useEffect } from 'react';
import { Network, User, PlusCircle } from 'lucide-react';
import { ethers } from 'ethers';

interface NavbarProps {
  currentView: 'discover' | 'upload';
  onViewChange: (view: 'discover' | 'upload') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('walletAddress');
    if (saved) setAddress(saved);
  }, []);

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert('MetaMask not installed. Please install it to continue.');
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      localStorage.setItem('walletAddress', userAddress);
      setAddress(userAddress);
    } catch (error: any) {
      console.error('Wallet connection failed:', error.message);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('walletAddress');
    setAddress(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 lg:px-12 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('discover')}>
        <div className="size-9 bg-primary text-white rounded-lg flex items-center justify-center">
          <Network className="size-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-primary dark:text-white">DART</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onViewChange('upload')}
          className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            currentView === 'upload' 
              ? 'bg-accent-teal text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
          }`}
        >
          <PlusCircle className="size-4" />
          Submit Paper
        </button>
        {address ? (
          <button
            onClick={disconnect}
            className="flex items-center justify-center rounded-lg h-10 px-5 bg-green-600 text-white text-sm font-bold transition-all hover:bg-red-500"
            title="Click to disconnect"
          >
            {address.slice(0, 6)}...{address.slice(-4)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-all hover:bg-slate-800"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};
