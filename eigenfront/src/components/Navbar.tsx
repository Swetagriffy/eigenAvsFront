import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = ['Explore', 'NFTs', 'Pools', 'More'];

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
              className="relative text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ x: 5 }} 
            >
              {item}
              {hoveredIndex === index && (
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
        <motion.button
          className="relative px-6 py-2 text-white font-semibold rounded-lg overflow-hidden group bg-blue-500 shadow-md hover:shadow-lg border-2 border-transparent hover:border-blue-600 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Connect</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-30 group-hover:opacity-50"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 25 }}
          />
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
