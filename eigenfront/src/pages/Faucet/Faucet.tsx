import { useState } from 'react';
import animationData from '../../assets/lottie/nofunds-lottie.json';
import Lottie from 'react-lottie';
import DropdownMint from '../../components/DropdownMint';
const FaucetForm = () => {
  const [sellAsset, setSellAsset] = useState<'ETH' | 'USDT'>('USDT');
  const [buyAsset, setBuyAsset] = useState<'ETH' | 'USDT'>('ETH');

  const handleSellAssetChange = (newSellAsset: 'ETH' | 'USDT') => {
    if (newSellAsset === buyAsset) {
      setBuyAsset(sellAsset);
    }
    setSellAsset(newSellAsset);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto mt-8 pt-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <div className="text-lg font-bold text-gray-700">
          Mint from the Faucet
        </div>
        <div className="w-10 h-10">
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <div className="text-sm text-gray-500 mb-4 w-full">
        This faucet transfers Test USDT Tokens and Sepolia ETH Confirm details
        before submitting.
      </div>

      <div className="space-y-1 mb-6"></div>
      <div className="w-full mb-4 mt-8">
        <label htmlFor="token" className="block text-gray-700 mb-2 font-medium">
          Token
        </label>
        <DropdownMint
          selectedAsset={sellAsset}
          onAssetChange={handleSellAssetChange}
        />
      </div>
      <div className="w-full mb-4 mt-8">
        <label htmlFor="token" className="block text-gray-700 mb-2 font-medium">
          Wallet Address
        </label>
        <input
          type="text"
          className="w-full text-lg font-bold text-black bg-[#f0f0f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-0"
          placeholder="0x..."
        />
      </div>
      <div className="mt-6">
        <button className="w-full bg-gradient-to-r from-[#6896F9] to-[#2463EB] text-white text-lg py-3 rounded-3xl font-semibold hover:from-blue-600 hover:to-blue-800">
          Mint
        </button>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500"></div>
    </div>
  );
};

export default FaucetForm;
