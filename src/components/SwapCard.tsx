import React, { useEffect, useState } from 'react';
import DropdownWithImages from './DropdownImage';
import { useSyncProviders } from '../hooks/useSyncProviders';
import { formatAddress } from '../utils';
import { ethers } from 'ethers';

interface SwapCardProps {
  onSwapClick: () => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ onSwapClick }) => {
  const [sellAmount, setSellAmount] = useState<string>('');
  const [buyAmount, setBuyAmount] = useState<string>('0');
  const [sellAsset, setSellAsset] = useState<'ETH' | 'USDT'>('USDT');
  const [buyAsset, setBuyAsset] = useState<'ETH' | 'USDT'>('ETH');
  const [price, setPrice] = useState<number | null>(null);
  const [userAccount, setUserAccount] = useState<string>('');
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();

  const providers = useSyncProviders();
  const metaMask = providers.find((item) => item.info.name === 'MetaMask');

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
    if (metaMask) {
      handleConnect(metaMask);
    }
  }, [sellAsset, buyAsset]);

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: 'eth_requestAccounts',
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);

      // Check and set the provider network to Sepolia
      const network = await providerWithInfo.provider.request({
        method: 'eth_chainId',
      });

      if (network !== '0xaa36a7') {
        // Sepolia network ID
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  // transaction functions
  const sendUSDTTransaction = async () => {
    if (!selectedWallet || !userAccount) {
      console.log('No wallet connected');
      return;
    }

    try {
      const USDT_CONTRACT_ADDRESS =
        '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06'; // Replace with the USDT contract address on Sepolia

      // Create a signer using the selected wallet's provider
      const provider = new ethers.BrowserProvider(selectedWallet.provider);
      const signer = await provider.getSigner();

      // Create a contract instance
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        [
          {
            constant: false,
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'value', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        signer
      );

      // Fetch gas fee data
      const feeData = await provider.getFeeData();
      const maxFeePerGas =
        feeData.maxFeePerGas || ethers.parseUnits('2', 'gwei');
      const maxPriorityFeePerGas =
        feeData.maxPriorityFeePerGas || ethers.parseUnits('1', 'gwei');

      // Convert amount to the appropriate decimal format (USDT typically has 6 decimals)
      const amountInWei = ethers.parseUnits(sellAmount, 6); // 6 decimals for USDT

      // Estimate gas limit

      // Call the `transfer` method with the estimated gas and fee parameters
      const tx = await usdtContract.transfer(
        '0x76B7e2b4312dD8C120FF0942e1FC297144Ed85a2',
        amountInWei,
        {
          gasLimit: ethers.parseUnits('2', 5),
          maxFeePerGas: maxFeePerGas,
          maxPriorityFeePerGas: maxPriorityFeePerGas,
        }
      );

      // Wait for transaction confirmation
      await tx.wait();
      console.log(`USDT Transaction sent. Hash: ${tx.hash}`);
    } catch (error) {
      console.error('USDT Transaction failed:', error);
    }
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
          onClick={sendUSDTTransaction}
          className="w-full bg-gradient-to-r from-[#6896F9] to-[#2463EB] text-white text-lg py-3 rounded-3xl font-semibold hover:from-blue-600 hover:to-blue-800"
        >
          {userAccount ? 'Buy' : 'Connect Wallet'}
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
