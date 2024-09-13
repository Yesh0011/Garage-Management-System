import React, { useEffect, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import axios from 'axios';
import { FaArchive, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Customerreaction() {
  const [formData, setFormData] = useState([]);
  const [filterData , setFilterData] = useState([]);
  const [query , setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/reaction/getAllReactions');
        setFormData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
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

  const deleteReaction = async (id) => {
    try {
      const res = await fetch(`/backend/reaction/deletereaction/${id}`, {
        method: 'DELETE',
      });

      setFormData(formData.filter((issue) => issue._id !== id));
      alert('Successfully Deleted');

    } catch (error) {
      console.log(error.message);
    }
  };

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
              <th className='border border-gray-300 px-4 py-2'>Approvel</th>
              <th className='border border-gray-300 px-4 py-2'>Engine</th>
              <th className='border border-gray-300 px-4 py-2'>Tyres</th>
              <th className='border border-gray-300 px-4 py-2'>Parts</th>
              <th className='border border-gray-300 px-4 py-2'>Request</th>
              <th className='border border-gray-300 px-4 py-2'>Date</th>
              <th className='border border-gray-300 px-4 py-2'>Daily Status</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((repair) => {
              const currentTime = new Date().getTime(); // Current time in milliseconds
              const repairTime = new Date(repair.time).getTime(); // Convert repair time to milliseconds
              const timeDifferenceMs =currentTime - repairTime  ; // Difference in milliseconds
              const timeDifference = new Date(timeDifferenceMs).toISOString().substr(11, 8); // Format: HH:mm:ss

              return (
                <tr key={repair._id}>
                  <td className='border border-gray-300 px-4 py-2'>{repair.email}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.vehiclenumber}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.approvel}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.engine}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.tyre}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.parts}</td>
                  <td className='border border-gray-300 px-4 py-2'>{repair.additional}</td>
                  <td className='border border-gray-300 px-4 py-2'>{new Date(repair.rdate).toLocaleDateString()}</td>
                  <td className='border border-gray-300 px-4 py-2'><Link to={`adddailyupdate/${repair._id}`}><div className='m-4 text-green-500'><FaExternalLinkAlt/></div></Link>
                  <div className='m-4 text-red-500'><button onClick={() => deleteReaction(repair._id)}><FaTrash/></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
