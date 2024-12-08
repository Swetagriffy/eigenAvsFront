import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSyncProviders } from '../hooks/useSyncProviders';
import { formatAddress } from '../utils';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path
  
  const [userAccount, setUserAccount] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const providers = useSyncProviders();
  const metaMask = providers.find((item) => item.info.name === 'MetaMask');


  const menuItems = [
    { label: 'Swap', path: '/' },
    { label: 'Orderbook', path: '/orderbook' },
    { label: 'Pools', path: '/pools' },
    { label: 'More', path: '/more' },
  ];


  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail | undefined) => {
    try {
      if(!providerWithInfo)return
      console.log('fuck')
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);

      // Check and set the provider network to Sepolia
      const network = await providerWithInfo.provider.request({
        method: "eth_chainId",
      });

      if (network !== "0xaa36a7") {
        // Sepolia network ID
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-900 rounded-full animate-pulse"></div>
          <span className="font-semibold text-blue-500 text-lg">Swap-Trade</span>
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
              {(location.pathname === item.path) && (
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

      <div className="flex items-center cursor-pointer" onClick={()=>handleConnect(metaMask)}>
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
         {userAccount?formatAddress(userAccount):"Connect Wallet"}
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
