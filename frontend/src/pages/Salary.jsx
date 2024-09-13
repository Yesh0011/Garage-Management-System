import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function Salary() {

    const navigate = useNavigate();
  

    const { id } = useParams();
    const [formData, setFormData] = useState({
      username: '',
      arrival_time:'',
      leave_time:'',
      date: '',
      perdaysalary:'',

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
        const updatedData = { perdaysalary: formData.perdaysalary };

        await axios.put(`http://localhost:5173/backend/employee/updateEmpsalary/${id}`, updatedData);

        alert('Per day salary updated successfully');
        navigate('/salaryreport');
    } catch (error) {
        console.error('Update error:', error);
        alert('Update error');
    }
};



  return (
    <div className="container mx-auto mt-10">
            <h1 className="text-3xl text-center font-semibold my-7">Day Salary</h1>
            <form onSubmit={handleSubmit} className="mx-auto max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        onChange={handleChange}
                        type="email"
                        id="username"
                        defaultValue={formData.username}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perdaysalary">
                        Per Day Salary
                    </label>
                    <input
                        onChange={handleChange}
                        type="number"
                        id="perdaysalary"
                        defaultValue={formData.perdaysalary}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    ADD
                </button>
            </form>
        </div>
  )
}
