import React, { useEffect, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function AllDailyStatus() {

  const [formData, setFormData] = useState([]);
  const [filterData , setFilterData] = useState([]);
  const [query , setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/daily/getAllStatus');
        setFormData(res.data);
 
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteStatus = async (id) => {
    try {
      const res = await fetch(`/backend/daily/deleteStatus/${id}`, {
        method: 'DELETE',
      });

      setFormData(formData.filter((issue) => issue._id !== id));
      alert('Successfully Deleted');

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (e) => {

    const getSearch = e.target.value;
    // console.log(getSearch);

    if(getSearch.length > 0)
    {
      const searchdata = formData.filter( (item) => item.vehiclenumber.toLowerCase().includes(getSearch));
      setFormData(searchdata);
    
    }else {
      setFormData(filterData);
    }

    setQuery(getSearch);

  }

  return (
    <div className='flex'>
      <div style={{ width: '250px', height: '487px', background: 'black', padding: '0px' }}>
        <Repairdashboard />
      </div>
      <div className='w-3/4 p-10'>
      <div> 
      <input type='text' placeholder='Fillter...' className='  ' value={query} onChange={(e) => handleSearch(e)}/>
      </div>
        <table className='w-full border-collapse border'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Vehicle Number</th>
              <th className='border border-gray-300 px-4 py-2'>Status</th>
              <th className='border border-gray-300 px-4 py-2'>Date</th>
              <th className='border border-gray-300 px-4 py-2'>Edit</th>
              <th className='border border-gray-300 px-4 py-2'>Detele</th>


            </tr>
          </thead>
          <tbody>
            {formData.map((status) => {
             

              return (
                <tr key={status._id}>
                  <td className='border border-gray-300 px-4 py-2'>{status.email}</td>
                  <td className='border border-gray-300 px-4 py-2'>{status.vehiclenumber}</td>
                 
                  <td className='border border-gray-300 px-4 py-2'>{status.details}</td>
              
                  <td className='border border-gray-300 px-4 py-2'>{new Date(status.date).toLocaleDateString()}</td>
                  <td className='border border-gray-300 px-4 py-2'><Link to={`dailyupdate/${status._id}`}><div className='m-4 text-green-500'><FaEdit/></div></Link></td>
                  <td className='border border-gray-300 px-4 py-2'><div className='m-4 text-red-500'><button onClick={() => deleteStatus(status._id)}><FaTrash/></button></div></td>

                </tr>
              );
            })}
          </tbody>

          </table>
          </div>
          </div>
  )
}
