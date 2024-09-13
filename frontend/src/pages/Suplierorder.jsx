import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SupplierOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/backend/order/pendingorders');
          const data = await res.json();
          console.log('Fetched Data:', data); // Debugging statement
          if (res.ok) {
            const pendingOrders = data.filter(order => order.status === true); // Filter only pending orders
            setOrders(pendingOrders);
            setLoading(false);
            setError(null);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    console.log('Orders State:', orders); // Debugging statement
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div className="bg-white min-h-screen text-black p-4 rounded-lg shadow-md">
        <br/><br/>
        <h1 className="text-3xl font-semibold mb-4">Pending Orders For You </h1>
        <table className="w-full rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 text-center">Order Name</th>
              <th className="py-2 text-center">Brand</th>
              <th className="py-2 text-center">Quantity</th>
              <th className="py-2 text-center">Model</th>
              <th className="py-2 text-wrap w-48">Description</th>
              <th className="py-2 text-center">Deadline</th>
              <th className="py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-50">
                <td className="py-2 text-center">{order.ordername}</td>
                <td className="py-2 text-center">{order.brand}</td>
                <td className="py-2 text-center">{order.quantity}</td>
                <td className="py-2 text-center">{order.model}</td>
                <td className="py-2 text-wrap mr-5 ml-5">{order.description}</td>
                <td className="py-2 text-center">{new Date(order.deadline).toLocaleDateString()}</td>
                <td className="py-2 text-center">
                  <div className="flex gap-2 justify-center">
                    
                    <Link to={`/toacceptorders/${order._id}`}>
                      <button className="bg-yellow-500 text-black py-1 px-2 rounded-lg hover:bg-yellow-600 focus:outline-none">View</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
