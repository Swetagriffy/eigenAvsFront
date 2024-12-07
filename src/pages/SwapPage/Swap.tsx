import React from 'react';

import SwapCard from '../../components/SwapCard';

const Swap: React.FC = () => {
  const handleSwapClick = () => {
    alert('Swap initiated!');
  };

  return (
    <div className=" min-h-screen w-full ">
   

      <div className="flex justify-center items-center pt-8 mt-8">
        <SwapCard onSwapClick={handleSwapClick} />
      </div>
    </div>
  );
};

export default Swap;
