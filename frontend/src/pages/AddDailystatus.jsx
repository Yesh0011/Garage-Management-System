import React, { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Repairdashboard from '../components/Repairdashboard';

export default function AddDailystatus() {

    const { id } = useParams();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    
  });

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/reaction/onereaction/${id}`)
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
    await axios.post('http://localhost:5173/backend/statushistory/createStatushistory', formData);

    const res = await axios.post(`http://localhost:5173/backend/daily/createStatus`, formData);
    console.log(res.data);
    alert('Status added successfully');
    navigate('/allstatus');
  } catch (error) {
    console.error('Error updating issue:', error);
  }
};





const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  return (
    <div style={{ display: 'flex',  padding: '0px' }}>
    <div style={{ width:'250px', background :'black', padding: '0px'  }}>
        <Repairdashboard />
    </div>
    <div className='mx-auto'>
      <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>DailyStatus</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>

      <input  onChange={handleChange} type='email'placeholder='Email' id='email'  className='border p-3 rounded-lg w-96 bg-slate-900 text-white' defaultValue={formData.email} disabled />

      <input onChange={handleChange} type='text'  id='vehiclenumber'  className='border p-3 rounded-lg w-96 bg-slate-900 text-white' defaultValue={formData.vehiclenumber} disabled />


      <input onChange={handleChange} type='date' id='date' className='border p-3 rounded-lg w-96 bg-slate-900 text-white' defaultValue={getCurrentDate()} />

      <textarea onChange={handleChange}    id='details'  className='border p-3 rounded-lg w-96 bg-slate-900 text-white'> </textarea>

      <button type='submit'className='bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80' >

      Submit
        </button>
        
        </form>

        
        

        
    </div>
    </div>
  )
}
