import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import FinancialAdmin from "./FinancialAddmin";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5173/backend/addparts/getAllSpareParts")
      .then((result) => {
        setItems(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = (item) => {
    alert("Item added successfully!");
    setSelectedItems([...selectedItems, item]);

    console.log(selectedItems);
  };

  // Convert items array to a string before passing it through the link
  const itemsString = JSON.stringify(selectedItems);

  return (
    <div className="flex flex-col md:flex-row" style={{backgroundImage: "url(/Lambogini.jpg)", backgroundSize: 'full'}}>
    <div className="w-full md:w-1/4"><FinancialAdmin/></div>
    <div className="w-full md:w-3/4">
      <div className="text-center">
        <h1 className="text-4xl p-4">
        <span className="text-yellow-600 font-semibold">Spare</span>
        <span className="text-white font-semibold">Parts</span>
      </h1>
      <h1 className="text-xl text-white px-8 font-semibold italic">
        Components available for purchase
      </h1>

      <div className="flex justify-center items-center max-w-6xl mx-auto p-5">
        <form className="bg-gray-700 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search SpareParts..."
            className="bg-transparent focus:outline-none w-80 sm:w-64 font-semibold italic text-white"
          />
          <FaSearch className="text-slatec-600 text-gray-400" />
        </form>
      </div>
      <main className="container mx-auto py-10 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-500 rounded-lg overflow-hidden shadow-md"
            >
              <div className="flex justify-center py-5">
                <img
                  className="h-40 w-40 object-cover object-center"
                  src={item.image} // Assuming you have an image URL in your item object
                  alt="Item Image"
                />
              </div>
              <div className="p-4 bg-gray-200">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">{item.price}</span>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center mt-8">
            <Link to={`/cart?items=${encodeURIComponent(itemsString)}`}  className="btn btn-outline-primary bg-yellow-600 text-bblack font-semibold py-2 px-5 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs text-center">
              View Cart
              
            </Link>

            
          </div>
        </div>
      </main>
    </div>
    </div>
    </div>
  );
}

export default ItemsPage;
