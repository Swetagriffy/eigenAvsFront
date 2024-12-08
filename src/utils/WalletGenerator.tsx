import React, { useState } from 'react';
import { ethers } from 'ethers';
import { createUser, User } from '../utils/user';

const WalletGenerator: React.FC = () => {
  const [walletDetails, setWalletDetails] = useState<{
    address: string;
    publicKey: string;
    privateKey: string;
  } | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);

  const generateWallet = async () => {
    try {
      const wallet = ethers.Wallet.createRandom();

      setWalletDetails({
        address: '',
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
      });

      const user: User = {
        public_address: wallet.address,
        private_address: wallet.privateKey,
        ethereum_address: wallet.publicKey,
      };

      const response = await createUser(user);
      setApiSuccess(`User created successfully: ${response.message}`);
      setApiError(null);
    } catch (error) {
      setApiError('Failed to create user. Please try again.');
      console.error('API Error:', error);
    } finally {
      setIsGenerated(true);
    }
  };

  return (
    <div
      className="wallet-generator"
      style={{ textAlign: 'center', margin: '20px' }}
    >
      {!isGenerated ? (
        <div
          onClick={generateWallet}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '5px',
            width: 'fit-content',
            margin: '10px auto',
          }}
        >
          Generate
        </div>
      ) : (
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#F44336',
            color: 'white',
            textAlign: 'center',
            cursor: 'default',
            borderRadius: '5px',
            width: 'fit-content',
            margin: '10px auto',
          }}
        >
          Generated
        </div>
      )}

      {walletDetails && (
        <div
          className="wallet-info"
          style={{ marginTop: '20px', textAlign: 'left' }}
        >
          <p>
            <strong>Address:</strong> {walletDetails.address}
          </p>
          <p>
            <strong>Public Key:</strong> {walletDetails.publicKey}
          </p>
          <p>
            <strong>Private Key:</strong> {walletDetails.privateKey}
          </p>
        </div>
      )}

      {apiSuccess && (
        <p style={{ color: 'green', marginTop: '20px' }}>{apiSuccess}</p>
      )}
      {apiError && (
        <p style={{ color: 'red', marginTop: '20px' }}>{apiError}</p>
      )}
    </div>
  );
};

export default WalletGenerator;
