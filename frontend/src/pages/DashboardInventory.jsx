import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardInventory = () => {
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);

  // useEffect for fetching data...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resQuantities = await fetch('/backend/addinventory/items');
        const dataQuantities = await resQuantities.json();
        if (resQuantities.ok) {
          const sum = dataQuantities.reduce((acc, item) => acc + item.quantity, 0);
          setTotalItemQuantity(sum);
        }

        const resOrders = await fetch('/backend/order/pendingorders');
        const dataOrders = await resOrders.json();
        if (resOrders.ok) {
          setTotalOrders(dataOrders.length);
        }

        const resLowStock = await fetch('/backend/addinventory/lowstock');
        const dataLowStock = await resLowStock.json();
        if (resLowStock.ok) {
          setLowStockItems(dataLowStock);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div
        className="top-border-image"
        style={{
          height: '500px',
          backgroundImage: `url('https://t4.ftcdn.net/jpg/05/18/04/85/360_F_518048588_0qCDXDXcL20Buk66a6bGkrAqHRJ7l6Dn.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6 text-white text-center">Dashboard</h1>
        <div className="flex justify-center gap-4 mb-4">
          <div className="bg-yellow-500 rounded-lg p-2 w-60 h-24 text-center">
            <p className="text-lg font-semibold text-black mt-4">Total Item Quantities</p>
            <p className="text-xl font-bold">{totalItemQuantity}</p>
          </div>
          <div className="bg-yellow-500 rounded-lg p-2 w-60 h-24 text-center">
            <p className="text-lg font-semibold text-black mt-4">Total Orders</p>
            <p className="text-xl font-bold">{totalOrders}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <Link to="/addinventory" className="bg-green-500 text-black py-2 px-4 rounded-md">
            + Add New Item
          </Link>
          <Link to="/item" className="bg-blue-500 text-black py-2 px-4 rounded-md">
            Item List
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-7">Low Stock Items</h2>
        <table className="bg-gray-100 w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-black text-white">Item Name</th>
              <th className="border px-4 py-2 bg-black text-white">Current Quantity</th>
              <th className="border px-4 py-2 bg-black text-white">Category</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardInventory;
