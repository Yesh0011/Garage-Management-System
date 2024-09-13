import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Itemlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/backend/addinventory/items');
        const data = await res.json();
        if (res.ok) {
          setItems(data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const HandleDelete = async (itemId) => {
    try {
      const res = await fetch(`/backend/addinventory/delete/${itemId}`, {
        method: 'DELETE',
      });



      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );

      alert("Success");
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleDownload() {
    const doc = new jsPDF();
    const marginLeft = 40;

    doc.setDrawColor(0);
    doc.setLineWidth(2);
    doc.roundedRect(10, 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 40, 10, 10, 'D');

    doc.setFontSize(15);
    doc.text('Inventory Report', 90, 35);

    const headers = [['Category', 'Item Name', 'Brand', 'Quantity', 'Model']];
    const data = items.map((item) => [
      item.category,
      item.name,
      item.brand,
      item.quantity,
      item.model,
      ,
    ]);

    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
      
      
    });

    doc.save('item_list_report.pdf');
  }

  return (
    <div className="bg-black min-h-screen text-black">
      
        <br /><br />
      <br/><br/>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Category ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg ml-5"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg mr-8"
        >
          <option value="All">All Categories</option>
          <option value="Tools">Tools</option>
          <option value="Oils">Oils</option>
          <option value="Safety">Safety</option>
          <option value="Paints">Paints</option>
          <option value="Spareparts">Spareparts</option>
        </select>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white', fontSize:'40px' }}>
        <p>Item List</p>
      </div>
      <Link
        to="/addinventory"
        className="bg-green-500 text-black py-2 px-4 rounded-md ml-5 mr-10"
      >
        + Add new Item
      </Link>
      <Link
        to="/dashboardinventory"
        className="bg-blue-500 text-black py-2 px-4 rounded-md"
      >
        Dashboard
      </Link>
      <button onClick={handleDownload} className="bg-red-500 text-black py-2 px-4 rounded-md ml-7 mr-10">
        Download Report
      </button>
      <table
        className="bg-white ml-5"
        style={{
          width: 'calc(100% - 10px)', // Adjusted width to take up most of the page width with small margins
          borderCollapse: 'collapse',
          marginTop: '20px',
          marginRight: '20px',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Category
            </th>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Item Name
            </th>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Brand
            </th>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Quantity
            </th>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Model
            </th>
            <th
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                fontWeight: 'bold',
              }}
              className="text-black"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.model.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(
              (item) =>
                selectedCategory === 'All' || item.category === selectedCategory
            )
            .map((item) => (
              <tr key={item._id}>
                <td
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                  className="text-black"
                >
                  {item.category}
                </td>
                <td
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                  className="text-black"
                >
                  {item.name}
                </td>
                <td
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                  className="text-black"
                >
                  {item.brand}
                </td>
                <td
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                  className="text-black"
                >
                  {item.quantity}
                </td>
                <td
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                  className="text-black"
                >
                  {item.model}
                </td>
                <td style={{ padding: '8px', border: '1px solid #ccc' }} className="text-black">
                  <div className='flex items-center'>
                    <button onClick={() => HandleDelete(item._id)} className='bg-red-500 text-white py-1 px-3 rounded-md mr-1 uppercase'>Delete</button>
                    <Link to={`/update/${item._id}`}>
                      <button className='bg-green-500 text-white py-1 px-3 rounded-md mr-1 uppercase'>Update</button>
                    </Link>
                    <Link to={`/details/${item._id}`}>
                      <button className='bg-yellow-500 text-black py-1 px-3 rounded-md uppercase'>View</button>
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

