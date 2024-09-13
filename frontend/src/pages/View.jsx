import React, { useEffect, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function View() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/backend/issues/getAllIssues');
        setFormData(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const deleteIssue = async (id) => {
    try {
      const res = await fetch(`/backend/issues/deleteIssue/${id}`, {
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
        <table className='w-full border-collapse border'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Vehicle Number</th>
              <th className='border border-gray-300 px-4 py-2'>Vehicle</th>
              <th className='border border-gray-300 px-4 py-2'>Engine</th>
              <th className='border border-gray-300 px-4 py-2'>Tyre</th>
              <th className='border border-gray-300 px-4 py-2'>Parts</th>
              <th className='border border-gray-300 px-4 py-2'>Date</th>
              <th className='border border-gray-300 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((repair) => (
              <tr key={repair._id}>
                <td className='border border-gray-300 px-4 py-2'>{repair.email}</td>
                <td className='border border-gray-300 px-4 py-2'>{repair.vehiclenumber}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <img src={repair.vehicle} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                </td>
                <td className='border border-gray-300 px-4 py-2'>{repair.engine}</td>
                <td className='border border-gray-300 px-4 py-2'>{repair.tyre}</td>
                <td className='border border-gray-300 px-4 py-2'>{repair.parts}</td>
                <td className='border border-gray-300 px-4 py-2'>{new Date(repair.date).toLocaleDateString()}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <div className='flex gap-4'>
                    <button onClick={() => deleteIssue(repair._id)} className='text-red-800' style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <FaTrash />
                    </button>
                    <Link to={`updateissue/${repair._id}`}>
                      <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <FaEdit />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
