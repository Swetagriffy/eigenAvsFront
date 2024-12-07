import React from 'react';
import Navbar from '../../components/Navbar';
import SwapCard from '../../components/SwapCard';

const Swap: React.FC = () => {
  const handleSwapClick = () => {
    alert('Swap initiated!');
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full ">
      <Navbar />

      <div className="flex justify-center items-center pt-8 mt-8">
        <SwapCard onSwapClick={handleSwapClick} />
      </div>
    </div>
  );
};

export default Swap;
