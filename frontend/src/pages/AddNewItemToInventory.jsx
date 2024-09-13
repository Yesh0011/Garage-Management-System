import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export default function AddNewItemToInventory() {
  const [formData, setFormData] = useState({
    category: 'Oils',
    name: '',
    brand: '',
    model: '',
    quantity: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('backend/addinventory/additem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/item`); // Navigate to the correct route upon successful submission
      }
      alert("Success");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  console.log(formData); // For testing purposes

  return (
    
    <div className="bg-black h-screen"><br/><br/><br/><br/>
    
      <div className="container mx-auto bg-white bg-opacity-80 p-8 max-w-2xl">
        <h1 className="text-3xl font-semibold text-center my-7">Add new item</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="border p-3 rounded-lg" htmlFor="category">
                Category of the item
              </label>
              <select
                name="category"
                id="category"
                onChange={handleChanges}
                value={formData.category}
                className="border p-3 rounded-lg"
              >
                <option value="Tools">Tools</option>
                <option value="Oils">Oils</option>
                <option value="Safety">Safety</option>
                <option value="Paints">Paints</option>
                <option value="Spareparts">Spareparts</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Product Name"
              className="border p-3 rounded-lg"
              id="name"
              name="name"
              required
              onChange={handleChanges}
              value={formData.name}
            />
            <input
              type="text"
              placeholder="Brand"
              className="border p-3 rounded-lg"
              id="brand"
              name="brand"
              required
              onChange={handleChanges}
              value={formData.brand}
            />
            <input
              type="text"
              placeholder="Model"
              className="border p-3 rounded-lg"
              id="model"
              name="model"
              required
              onChange={handleChanges}
              value={formData.model}
            />
            <input
              type="text"
              placeholder="Quantity"
              className="border p-3 rounded-lg"
              id="quantity"
              name="quantity"
              required
              onChange={handleChanges}
              value={formData.quantity}
            />

            <button
              type="submit"
              className="p-3 bg-yellow-600 text-white rounded-lg hover:opacity-95 disabled:opacity-70"
            >
              {loading ? 'Adding...' : 'Add Item'}
            </button>
            {error && <p className="text-red-800 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
