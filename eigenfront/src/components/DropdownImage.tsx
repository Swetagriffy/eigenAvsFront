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
    value: 'DAI',
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
      marginRight: '4px',
      borderRadius: '30px',
      border: 'none',
      minHeight: '32px',
      boxShadow: 'none',
      flex: '1 1 auto',
      display: 'flex',
      '&:hover': {},
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      border: 'none',
      backgroundColor: state.isFocused ? '#EFF4FF' : 'white',
      color: state.isFocused ? '#1f2937' : '#4b5563',
      transition: 'all 0.2s ease-in-out',
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
      flex: '1 1 auto',
      marginTop: '4px',

      border: 'none',
      boxShadow: 'none',
      animation: 'fadeIn 0.2s ease-in-out',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
  };

  const selectedOption = currencyOptions.find(
    (option) => option.value === selectedAsset
  );

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      onAssetChange(selectedOption.value as 'ETH' | 'USDT');
    }
  };

  return (
    <div className="flex items-center">
      <Select
        options={currencyOptions}
        defaultValue={currencyOptions[0]}
        styles={customStyles}
        components={{ IndicatorSeparator: () => null }} // Removes separator
      />
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default DropdownWithImages;
