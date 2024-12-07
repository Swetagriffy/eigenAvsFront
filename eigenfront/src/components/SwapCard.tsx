import React, { useEffect, useState } from 'react';
import DropdownWithImages from './DropdownImage';

interface SwapCardProps {
  onSwapClick: () => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ onSwapClick }) => {
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [asset, setAsset] = useState<'ETH' | 'USDT'>('ETH');

  const fetchPrice = async () => {
    try {
      const symbol = asset === 'ETH' ? 'ETHUSDT' : 'USDTUSDT';
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      const data = await response.json();
      setPrice(parseFloat(data.price));
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [asset]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleAssetChange = (newAsset: 'ETH' | 'USDT') => {
    setAsset(newAsset);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
      <div className="flex justify-start mb-6 ">
        <button className="bg-[#EFF4FF] text-[#2463EB] text-sm font-medium px-3 py-1 rounded-full focus:outline-none">
          Swap
        </button>
        <button className="bg-[#f7f9ffcb] text-[#2463EB] text-sm font-medium mx-2 py-1 rounded-full focus:outline-none">
          Trade
        </button>
      </div>

      <div className="space-y-1 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">Sell</span>
        </div>
        <div className="flex items-center space-x-4 bg-gray-100 rounded-lg h-20">
          <div className="flex-1 ">
            <input
              type="number"
              className="w-full text-lg font-bold text-black bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-0"
              placeholder="0"
              value={amount}
              onChange={handleInputChange}
            />
            <span className="ml-3 text-sm text-gray-500">
              {price !== null && amount
                ? `$${(price * parseFloat(amount || '0')).toFixed(2)}`
                : price !== null
                  ? '$0.00'
                  : 'Fetching price...'}
            </span>
          </div>
          <DropdownWithImages
            selectedAsset={asset}
            onAssetChange={handleAssetChange}
          />
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">Buy</span>
        </div>
        <div className="flex items-center space-x-4 bg-gray-100 rounded-lg h-20">
          <div className="flex-1 ">
            <input
              type="number"
              className="w-full text-lg font-bold text-black bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-0"
              placeholder="0"
              disabled
            />
            <span className="ml-3 text-sm text-gray-500">$24,481.80</span>
          </div>
          <DropdownWithImages
            selectedAsset={asset}
            onAssetChange={handleAssetChange}
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onSwapClick}
          className="w-full bg-gradient-to-r from-[#6896F9] to-[#2463EB] text-white text-lg py-3 rounded-3xl font-semibold hover:from-blue-600 hover:to-blue-800"
        >
          Connect Wallet
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="text-left">1 USDT = 0.00044 ETH ($1.00)</span>
        <span className="text-right">$44.48</span>
      </div>
    </div>
  );
};

export default SwapCard;
