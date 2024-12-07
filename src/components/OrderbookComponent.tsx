import React from 'react';

type Order = {
  price: string;
  quantity: string;
  type: 'buy' | 'sell'; 
};

const orders: Order[] = [
  { price: '1800.00', quantity: '2.5', type: 'buy' },
  { price: '1795.00', quantity: '1.8', type: 'buy' },
  { price: '1810.00', quantity: '1.2', type: 'sell' },
  { price: '1820.00', quantity: '3.0', type: 'sell' },
];

const OrderbookComponent: React.FC = () => {
  const buyEthOrders = orders.filter(order => order.type === 'buy').sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  const sellEthOrders = orders.filter(order => order.type === 'sell').sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

  const renderRows = () => {
    const maxRows = Math.max(buyEthOrders.length, sellEthOrders.length);

    return Array.from({ length: maxRows }).map((_, index) => (
      <tr key={index} className="hover:bg-gray-50">
       
        <td className="ps-4 py-4 text-green-700 font-semibold">
          {buyEthOrders[index] ? `${buyEthOrders[index].quantity} ETH` : '-'}
        </td>
        <td className="py-4 text-green-700 text-center font-medium">
          {buyEthOrders[index] ? `$${buyEthOrders[index].price}` : '-'}
        </td>
   
        <td className="py-4 text-center text-black font-semibold">-</td>

        <td className="py-4 text-red-700 text-center font-medium">
          {sellEthOrders[index] ? `$${sellEthOrders[index].price}` : '-'}
        </td>
        <td className="pe-4 py-4 text-red-700 font-semibold text-right">
          {sellEthOrders[index] ? `${sellEthOrders[index].quantity} ETH` : '-'}
        </td>
      </tr>
    ));
  };

  return (
    <div className="card max-h-[28.5rem] overflow-y-scroll bg-white shadow-lg rounded-lg">
      <div className="card-body p-6">
        <div className="table-responsive">
          <table className="table w-full text-lg text-left text-gray-700 border-collapse border-spacing-4">
            <thead className="text-base uppercase text-gray-600 bg-blue-100 rounded-t-lg">
              <tr>
                <th className="ps-4 py-3" style={{ width: '25%' }}>
                  Buy ETH (Sell USDT)
                </th>
                <th className="py-3 text-center" style={{ width: '15%' }}>
                  Price
                </th>
                <th className="py-3 text-center" style={{ width: '10%' }}>
                  -
                </th>
                <th className="py-3 text-center" style={{ width: '15%' }}>
                  Price
                </th>
                <th className="pe-4 py-3 text-right" style={{ width: '25%' }}>
                  Sell ETH (Buy USDT)
                </th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderbookComponent;
