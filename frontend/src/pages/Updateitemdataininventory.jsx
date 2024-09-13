import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update() {
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
  const params = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      const itemId = params.itemid;
      
      const res = await fetch(`/backend/addinventory/get/${itemId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchItemData();
  }, [params.itemid]);

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
      const res = await fetch(`/backend/addinventory/update/${params.itemid}`, {
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

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg max-w-xl mx-auto"><br/>
        <h1 className='text-3xl font-semibold text-center mb-7 text-black'>Update item</h1>
        <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 flex-1'>
            <div>
              <label className='border p-3 rounded-lg text-b ' htmlFor="category">Category of the item</label>
              <select
                name="category"
                id="category"
                onChange={handleChanges}
                value={formData.category}
                className="border p-3 rounded-lg text-black bg-white"
                style={{ color: "black" }} // Set text color to black
              >
                <option value="Tools">Tools</option>
                <option value="Oils">Oils</option>
                <option value="Safety">Safety</option>
                <option value="Paints">Paints</option>
                <option value="Spareparts">Spareparts</option>
              </select>
            </div>
            <input type="text" placeholder='Product Name' className='border p-3 rounded-lg text-black' id='name' name='name' required onChange={handleChanges} value={formData.name} />
            <input type="text" placeholder='Brand' className='border p-3 rounded-lg text-black' id='brand' name='brand' required onChange={handleChanges} value={formData.brand} />
            <input type="text" placeholder='Model' className='border p-3 rounded-lg text-black' id='model' name='model' required onChange={handleChanges} value={formData.model} />
            <input type="text" placeholder='Quantity' className='border p-3 rounded-lg text-black' id='quantity' name='quantity' required onChange={handleChanges} value={formData.quantity} />

            <button type="submit" className='p-3 bg-yellow-600 text-black rounded-lg hover:opacity-95 disabled:opacity-70'>{loading ? 'Updating...' : 'Update Item'}</button>
            {error && <p className='text-red-800 text-sm'>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
