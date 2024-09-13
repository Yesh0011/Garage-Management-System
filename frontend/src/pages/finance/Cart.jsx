import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemsString = searchParams.get("items");
  const items = JSON.parse(decodeURIComponent(itemsString));

  // Calculate total price
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div
      className="bg-cover bg-no-repeat bg-center w-full h-full"
      style={{ backgroundImage: "url(/Lambogini.jpg)" }}
    >
      <h1 className="text-4xl p-4">
        <span className="text-yellow-600 font-semibold">Cart</span>
        <span className="text-white font-semibold">Page</span>
      </h1>
      <h1 className="text-xl text-white px-8 font-semibold italic">
        Review items before checkout
      </h1>

      <div className="max-h-screen p-10 flex justify-center bg-gray-0">
        <div className="min-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 items-start justify-center">
            <form className="sm:flex-row  flex-col gap-5 bg-gray-500 p-8 mb-4 rounded-lg w-full md:w-1/2">
              <div className="flex flex-col gap-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-yellow-600 text-xl">Product</th>
                      <th className="text-yellow-600 text-xl">Description</th>
                      <th className="text-yellow-600 text-xl">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                    <div className="text-black p-5 text-2xl text-center font-semibold text">
                      Total Price: Rs.{total.toFixed(2)}
                    </div>
              </div>
              <div className="flex gap-4 my-2 justify-center">
                <a
                  href="http://localhost:5173/checkout"
                  className="bg-yellow-600 text-black py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                >
                  Checkout
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
