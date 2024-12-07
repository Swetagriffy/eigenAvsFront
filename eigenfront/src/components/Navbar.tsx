import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current path

  const menuItems = [
    { label: 'Swap', path: '/' },
    { label: 'Orderbook', path: '/orderbook' },
    { label: 'Pools', path: '/pools' },
    { label: 'More', path: '/more' },
  ];

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

      <div className="flex items-center">
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
          Connect Wallet
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
