import React, { useEffect, useState } from 'react';
import DropdownWithImages from './DropdownImage';

interface SwapCardProps {
  onSwapClick: () => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ onSwapClick }) => {
  const [sellAmount, setSellAmount] = useState<string>('');
  const [buyAmount, setBuyAmount] = useState<string>('0');
  const [sellAsset, setSellAsset] = useState<'ETH' | 'USDT'>('USDT');
  const [buyAsset, setBuyAsset] = useState<'ETH' | 'USDT'>('ETH');
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    try {
      const symbol =
        sellAsset === 'USDT' && buyAsset === 'ETH'
          ? 'ETHUSDT'
          : sellAsset === 'ETH' && buyAsset === 'USDT'
            ? 'ETHUSDT'
            : null;
      console.log(`hi at symbol ${symbol}`);

      if (!symbol) {
        setPrice(null);
        return;
      }

      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
      );
      const data = await response.json();
      setPrice(parseFloat(data.price));
      console.log(`hi at price ${price}`);
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, [sellAsset, buyAsset]);

  const handleSellInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setSellAmount(value);

      if (price !== null && value !== '') {
        const sellValue = parseFloat(value);
        const buyValue =
          sellAsset === 'USDT' && buyAsset === 'ETH'
            ? sellValue / price
            : sellAsset === 'ETH' && buyAsset === 'USDT'
              ? sellValue * price
              : 0;

        setBuyAmount(buyValue.toFixed(6));
      } else {
        setBuyAmount('0');
      }
    }
  };

  const handleSellAssetChange = (newSellAsset: 'ETH' | 'USDT') => {
    if (newSellAsset === buyAsset) {
      setBuyAsset(sellAsset);
    }
    setSellAsset(newSellAsset);
  };

  const handleBuyAssetChange = (newBuyAsset: 'ETH' | 'USDT') => {
    if (newBuyAsset === sellAsset) {
      setSellAsset(buyAsset);
    }
    setBuyAsset(newBuyAsset);
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
              value={sellAmount}
              onChange={handleSellInputChange}
            />
          </div>
          <DropdownWithImages
            selectedAsset={sellAsset}
            onAssetChange={handleSellAssetChange}
          />
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-gray-700">Buy</span>
        </div>
        <div className="flex items-center space-x-4 bg-gray-100 rounded-lg h-20">
          <div className="flex-1 ">
            <div className="w-full text-lg font-bold text-black bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-0">
              {sellAmount === '0' ? 0 : buyAmount}
            </div>
          </div>
          <DropdownWithImages
            selectedAsset={buyAsset}
            onAssetChange={handleBuyAssetChange}
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
        <span className="text-left">
          {price !== null
            ? `1 ${sellAsset} = ${
                sellAsset === 'USDT' ? (1 / price).toFixed(6) : price.toFixed(2)
              } ${buyAsset}`
            : 'Fetching price...'}
        </span>
      </div>
    </div>
  );
};

export default SwapCard;
