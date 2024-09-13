import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function FirstAttendance() {
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

  const handleUserClick = (userData) => {
    setSelectedUser(userData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  


  return (
    <div className='container mx-auto mt-10 p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Attendance Form</h1>

      <table className='w-full'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>UserName</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((user) => (
            <tr key={user._id}>
              <td className='border border-gray-300 px-4 py-2'>
                <Link to={`mark/${user._id}`} className='text-blue-500 hover:underline'>
                  {user.username}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
