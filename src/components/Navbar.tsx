// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { useSyncProviders } from '../hooks/useSyncProviders';
import { formatAddress } from '../utils';
import { createUser, User } from '../utils/user';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userAccount, setUserAccount] = useState<string>('');
  const [, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const providers = useSyncProviders();
  const metaMask = providers.find((item) => item.info.name === 'MetaMask');

  const menuItems = [
    { label: 'Swap', path: '/' },
    { label: 'Orderbook', path: '/orderbook' },
    { label: 'Mint', path: '/faucet' },
    { label: 'More', path: '/more' },
  ];

  const handleConnect = async (
    providerWithInfo: EIP6963ProviderDetail | undefined
  ) => {
    try {
      if (!providerWithInfo) {
        console.log('No provider found.');
        return;
      }

      // Request account connection
      const accounts = await providerWithInfo.provider.request({
        method: 'eth_requestAccounts',
      });

      // Set wallet and user account
      setSelectedWallet(providerWithInfo);
      const connectedAccount = accounts?.[0];
      setUserAccount(connectedAccount);
      console.log('User account: ' + connectedAccount);

      if (!connectedAccount) {
        console.log('No account found.');
        return;
      }

      const wallet = ethers.Wallet.createRandom();

      const user: User = {
        public_address: wallet.address,
        private_address: wallet.privateKey,
        ethereum_address: connectedAccount,
      };
      console.log('Generated Wallet:', user);

      const response = await createUser(user);
      setApiSuccess(`User created successfully: ${response.message}`);
      setApiError(null);

      setUserAccount(wallet.address);

      const network = await providerWithInfo.provider.request({
        method: 'eth_chainId',
      });

      if (network !== '0xaa36a7') {
        console.log('Incorrect network. Please switch to Sepolia.');
        return;
      }
    } catch (error) {
      setApiError('Failed to connect and create user. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-900 rounded-full animate-pulse"></div>
          <span className="font-semibold text-blue-500 text-lg">
            Swap-Trade
          </span>
        </div>

        <div className="hidden md:flex space-x-6 relative">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className={`relative text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer ${
                location.pathname === item.path ? 'text-blue-600' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="hover-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => handleConnect(metaMask)}
        >
          <motion.div
            initial={{
              backgroundImage:
                'linear-gradient(to right, white, white), linear-gradient(0deg, #2463EB, white 40%)',
            }}
            animate={{
              backgroundImage:
                'linear-gradient(to right, white, white), linear-gradient(360deg, #2463EB, white 40%)',
            }}
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: 2,
              repeat: Infinity,
            }}
            style={{
              border: '2px solid transparent',
              borderRadius: '20px',
              backgroundClip: 'padding-box, border-box',
              backgroundOrigin: 'padding-box, border-box',
              width: 160,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
            }}
          >
            {userAccount ? formatAddress(userAccount) : 'Connect Wallet'}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
