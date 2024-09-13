import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ItemDetails() {
  const [itemdata, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/backend/addinventory/get/${params.itemid}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setLoading(false);
          return;
        }
        setItemData(data);
        setLoading(false); // Set loading to false after successful data retrieval
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function

    // Add fetchData as a dependency for the useEffect hook
  }, [params.itemid]);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <style>
        {`
          body {
            background-color: #000;
          }

          .details-container {
            background-color: rgba(255, 255, 255, 0.20);
          }
        `}
      </style>
      <div className="absolute top-0 left-0 w-full h-80 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('https://www.gosiger.com/hs-fs/hubfs/parts_pgbanner.jpg?width=1000&name=parts_pgbanner.jpg')` }}></div>
      <div className="relative details-container" style={{ marginTop: '12rem', padding: '1rem', borderRadius: '8px' }}>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">Error fetching data.</p>
        ) : itemdata ? (
          <div>
            <h2 className="text-5xl font-semibold mb-4 text-white">Item Details</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className='font-semibold' >Item Name &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;   {itemdata.name}</p>
              <p className='font-semibold' >Category &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;   {itemdata.category}</p>
              <p className='font-semibold' >Brand &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;   {itemdata.brand}</p>
              <p className='font-semibold' >Model &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;   {itemdata.model}</p>
              <p className='font-semibold' >Quantity &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;  {itemdata.quantity}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No data available.</p>
        )}
      </div>
    </div>
  );
}

