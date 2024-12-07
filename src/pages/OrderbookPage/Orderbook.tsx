import React from 'react';
import OrderbookComponent from '../../components/OrderbookComponent';

const Orderbook: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl text-blue-600 font-bold mb-4">Orderbook</h1>
      <OrderbookComponent />
    </div>
  );
};

export default Orderbook;

