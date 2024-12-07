import React from 'react';
import Select from 'react-select';

const currencyOptions = [
  {
    value: 'USDT',
    label: (
      <div className="flex items-center">
        <img
          src="https://cryptologos.cc/logos/tether-usdt-logo.png"
          alt="USDT"
          className="w-5 h-5 mr-2"
        />
        USDT
      </div>
    ),
  },
  {
    value: 'ETH',
    label: (
      <div className="flex items-center">
        <img
          src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
          alt="ETH"
          className="w-5 h-5 mr-2"
        />
        ETH
      </div>
    ),
  },
];

interface DropdownWithImagesProps {
  selectedAsset: 'ETH' | 'USDT';
  onAssetChange: (asset: 'ETH' | 'USDT') => void;
}

const DropdownWithImages: React.FC<DropdownWithImagesProps> = ({
  selectedAsset,
  onAssetChange,
}) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: '4px',
      borderRadius: '10px',
      border: 'none',
      minHeight: '32px',
      boxShadow: 'none',
      display: 'flex',
      width: '100%',
      backgroundColor: '#f0f0f0', // Change the background color
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      backgroundColor: state.isFocused ? '#EFF4FF' : 'white',
      color: state.isFocused ? '#1f2937' : '#4b5563',
      width: '100%',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: '4px',
      border: 'none',
      boxShadow: 'none',
      width: '100%',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      onAssetChange(selectedOption.value as 'ETH' | 'USDT');
    }
  };

  return (
    <div className="w-full">
      <Select
        options={currencyOptions}
        value={currencyOptions.find((option) => option.value === selectedAsset)} // Bind to selectedAsset
        onChange={handleChange}
        styles={customStyles}
        components={{ IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default DropdownWithImages;
