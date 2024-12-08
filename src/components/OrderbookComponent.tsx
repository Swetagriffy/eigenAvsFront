import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  orderid: number;
  amount: string;
  price: string;
  token: string;
  quantity: string;
  type: 'buy' | 'sell';
};

const OrderbookComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orderbook'); // Adjust the URL if necessary
        console.log('Fetched orders:', response.data); // Log the response data
        setOrders(response.data); // Assuming the response is an array of orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const renderRows = () => {
    return orders.map((order) => (
      <tr key={order.orderid} className="hover:bg-gray-50">
        <td className="ps-4 py-4 text-green-700 font-semibold">
          {order.orderid}
        </td>
        <td className="py-4 text-green-700 text-center font-medium">
          {order.token}
        </td>

        <td className="py-4 text-red-700 text-center font-medium">
          {order.amount}
        </td>
        <td className="pe-4 py-4 text-red-700 font-semibold text-right">
          ${order.price}
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
                  OrderId
                  {/* Show token dynamically */}
                </th>
                <th className="py-3 text-center" style={{ width: '15%' }}>
                  Token
                </th>
                <th className="py-3 text-center" style={{ width: '15%' }}>
                  Amount
                </th>
                <th className="pe-4 py-3 text-right" style={{ width: '25%' }}>
                  Price
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
