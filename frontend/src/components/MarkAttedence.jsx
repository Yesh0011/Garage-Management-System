import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function MarkAttedence() {

    const navigate = useNavigate();
  

  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: '',
    arrival_time:'',
    leave_time:'',
    date: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/employee/oneaddEmp/${id}`)
    .then((res) => {
       setFormData(res.data);
    })
    .catch((error) => {
        console.log(error);
    })

} , [id])

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      await axios.post('http://localhost:5173/backend/attendence/createAttendence',formData);
      await axios.put(`http://localhost:5173/backend/employee/updategetEmp/${id}`);

      alert('Mark attendence successfully');
      navigate('/arrival')
    } catch (error) {
        // console.error(err)
        alert('Already mark attendence');
        navigate('/arrival')

}
  };

  return (
    <div className="container mx-auto mt-10">
            <form onSubmit={handleSubmit} className="mx-auto max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input
                    onChange={handleChange}
                    type="email"
                    id="username"
                    defaultValue={formData.username}
                    placeholder="Username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    onChange={handleChange}
                    type="text"
                    id="arrival_time"
                    defaultValue={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/:/g, '.')}
                    placeholder="Arrival Time"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Morning
                </button>
            </form>
        </div>
  )
}
