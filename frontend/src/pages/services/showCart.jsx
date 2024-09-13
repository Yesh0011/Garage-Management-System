import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function showCart() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <main>
      <div>
        <h1>Cart</h1>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              {/* You can add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
