import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import Admindashboard from '../components/Admindashboard';

export default function AddSalary() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user data
  
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await axios.get('http://localhost:5173/backend/employee/getAllemp');
          setFormData(res.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    
  
  
    return (
      
       <div className='flex  max-w-lg mx-auto '> 

      <div className='' style={{position: 'relative', right:'520px'}}>
        <Admindashboard/>
      </div>
      
<div className='justify-between w-1/4 my-4 gap-6'style={{position: 'relative', right:'50px'}}>
        <h1 className='text-3xl text-center font-semibold my-7'>Add Salary</h1>
  
        <table>
          <thead>
            <tr>
              <th className='border border-gray-300 px-4 py-2'>UserName</th>
              <th className='border border-gray-300 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((user) => (
              <tr key={user._id}>
                <td className='border border-gray-300 px-4 py-2'>{user.username}</td>
               <td className='text-green-700 border border-gray-300 px-4 py-2'><Link to={`salary/${user._id}`}><FaEdit/></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
  
        </div>
      </div>
    );
  }
  