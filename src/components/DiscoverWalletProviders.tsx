import { useState } from "react";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { ethers } from "ethers";
import { formatAddress } from "../utils";

const USDT_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"_mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"_giveMeATokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState<string>("");

  const [transactionStatus, setTransactionStatus] = useState<string>("");
  const providers = useSyncProviders();

  // Connect to the selected provider using eth_requestAccounts.
  //   const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
  //     try {
  //       const accounts = await providerWithInfo.provider.request({
  //         method: "eth_requestAccounts"
  //       })

  //       setSelectedWallet(providerWithInfo)
  //       setUserAccount(accounts?.[0])
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
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
        setTransactionStatus("Please switch to Sepolia Testnet.");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Send ETH transaction
  const sendTransaction = async (toAddress: string, amount: string) => {
    if (!selectedWallet || !userAccount) {
      setTransactionStatus("Please connect your wallet first.");
      return;
    }

    try {
      const transactionParameters = {
        from: userAccount,
        to: toAddress,
        value: ethers.parseEther("0.000001").toString(),
        gasLimit: "0x5028",
        maxFeePerGas: "0x2540be400",
        maxPriorityFeePerGas: "0x3b9aca00",
      };

      const txHash = await selectedWallet.provider.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setTransactionStatus(`Transaction sent. Hash: ${txHash}`);
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transaction failed.");
    }
  };

  const sendUSDTTransaction = async (toAddress: string, amount: string) => {
    if (!selectedWallet || !userAccount) {
      setTransactionStatus("Please connect your wallet first.");
      return;
    }
  
    try {
      const USDT_CONTRACT_ADDRESS =
        "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // Replace with the USDT contract address on Sepolia
  
      // Create a signer using the selected wallet's provider
      const provider = new ethers.BrowserProvider(selectedWallet.provider);
      const signer = await provider.getSigner();
  
      // Create a contract instance
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        [
          {
            "constant": false,
            "inputs": [
              { "name": "to", "type": "address" },
              { "name": "value", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        signer
      );
  
      // Fetch gas fee data
      const feeData = await provider.getFeeData();
      const maxFeePerGas =
        feeData.maxFeePerGas || ethers.parseUnits("2", "gwei");
      const maxPriorityFeePerGas =
        feeData.maxPriorityFeePerGas || ethers.parseUnits("1", "gwei");
  
      // Convert amount to the appropriate decimal format (USDT typically has 6 decimals)
      const amountInWei = ethers.parseUnits(amount, 6); // 6 decimals for USDT
  
      // Estimate gas limit
  
      // Call the `transfer` method with the estimated gas and fee parameters
      const tx = await usdtContract.transfer(toAddress, amountInWei, {
        gasLimit:  ethers.parseUnits("2",5),
        maxFeePerGas: maxFeePerGas,
        maxPriorityFeePerGas: maxPriorityFeePerGas,
      });
  
      // Wait for transaction confirmation
      await tx.wait();
      console.log(tx)
      setTransactionStatus(`USDT Transaction sent. Hash: ${tx.hash}`);
    } catch (error) {
      console.error("USDT Transaction failed:", error);
      setTransactionStatus("USDT Transaction failed.");
    }
  };
  


  const mintUSDT = async (receiver: string, amount: string) => {
    if (!selectedWallet || !userAccount) {
      setTransactionStatus("Please connect your wallet first.");
      return;
    }
  
    try {
      const USDT_CONTRACT_ADDRESS = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // Replace with the correct contract address on Sepolia
  
      // Create a signer using the selected wallet's provider
      const provider = new ethers.BrowserProvider(selectedWallet.provider);
      const signer = await provider.getSigner();
  
      // Create a contract instance
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        [
            {
              "constant": false,
              "inputs": [
                { "name": "receiver", "type": "address" },
                { "name": "amount", "type": "uint256" }
              ],
              "name": "_mint",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
        signer
      );
  
      // Convert amount to the appropriate decimals (e.g., 6 decimals for USDT)
      const amountInWei = ethers.parseUnits(amount, 6);
  
      // Fetch fee data
      const feeData = await provider.getFeeData();
      const maxFeePerGas = feeData.maxFeePerGas || ethers.parseUnits("2", "gwei");
     
      // Estimate gas
    //   const gasLimit = await usdtContract.estimateGas._mint(receiver, amountInWei);
  
      // Call the `_mint` function
      const tx = await usdtContract._mint(receiver, amountInWei, {
        gasLimit:  ethers.parseUnits("2",5),
        maxFeePerGas: maxFeePerGas,
      });
  
      // Wait for transaction confirmation
      await tx.wait();
  
      setTransactionStatus(`Mint transaction sent. Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Mint transaction failed:", error);
      setTransactionStatus("Mint transaction failed.");
    }
  };
  

  return (
    <>
      <h2>Wallets Detected:</h2>
      <button
        onClick={() =>
          sendUSDTTransaction("0x923E3cA187Ac9035cf05e4B42448b8b349e79c5C", "1")
        }
      >
        Send Transaction
      </button>
      <div>
        {providers.length > 0 ? (
          providers?.map((provider: EIP6963ProviderDetail) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleConnect(provider)}
            >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount && (
        <div>
          <div>
            <img
              src={selectedWallet?.info.icon}
              alt={selectedWallet?.info.name}
            />
            <div>{selectedWallet?.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        </div>
      )}
    </>
  );
};
