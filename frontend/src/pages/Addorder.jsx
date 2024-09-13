import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

export default function AddOrder() {
  const [formData, setFormData] = useState({
    ordername: '',
    brand: '',
    quantity: '',
    model: '',
    description: '',
    deadline: '',
    status: true,
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
      const res = await fetch('backend/order/addorder', {
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
        navigate(`/pendingorders`);
      }
      alert("Success");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      
    <main className='p-3 max-w-4xl mx-auto'>
      
      <h1 className='text-3xl font-semibold text-center my-7'>Add new Order</h1>
      <form className='flex flex-col sm:flex-row gap-4 bg-black bg-opacity-80 p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Order Name'
            className='border p-3 rounded-lg'
            id='ordername'
            name='ordername'
            required
            onChange={handleChanges}
            value={formData.ordername}
          />
          <input
            type='text'
            placeholder='Brand'
            className='border p-3 rounded-lg'
            id='brand'
            name='brand'
            required
            onChange={handleChanges}
            value={formData.brand}
          />
          <input
            type='text'
            placeholder='Model'
            className='border p-3 rounded-lg'
            id='model'
            name='model'
            required
            onChange={handleChanges}
            value={formData.model}
          />
          <input
            type='text'
            placeholder='Quantity'
            className='border p-3 rounded-lg'
            id='quantity'
            name='quantity'
            required
            onChange={handleChanges}
            value={formData.quantity}
          />
          <span className='text-white'>Deadline :</span>
          <input
            type='date'
            placeholder='Deadline'
            className='border p-3 rounded-lg'
            id='deadline'
            name='deadline'
            required
            onChange={handleChanges}
            value={formData.deadline}
          />
        </div>
        <div className='flex flex-col gap-4 flex-1'>
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg h-72'
            id='description'
            name='description'
            required
            onChange={handleChanges}
            value={formData.description}
          />
          <button
            type='submit'
            className='p-3 bg-yellow-600 text-white rounded-lg hover:opacity-95 disabled:opacity-70'
          >
            {loading ? 'Adding...' : 'Add Order'}
          </button>
          {error && <p className='text-red-800 text-sm'>{error}</p>}
        </div>
      </form>
    </main></div>
  );
}
