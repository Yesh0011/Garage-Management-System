import React from 'react';
import { Link } from 'react-router-dom';

export default function Ordersystem() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-illustration/sci-fi-futuristic-concrete-cement-600nw-1642355500.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-white mb-6">Order Management System</h1>
        <div className="flex justify-center mt-10">
          <Link to="/pendingorders">
            <button className="bg-yellow-500 text-black py-3 px-6 rounded-lg mr-4">Pending Orders</button>
          </Link>
          <Link to="/acceptedorders">
            <button className="bg-yellow-500 text-black py-3 px-6 rounded-lg mr-4">Accepted Orders</button>
          </Link>
          <Link to="/addnewitemorder">
            <button className="bg-yellow-500 text-black py-3 px-6 rounded-lg">Create Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
