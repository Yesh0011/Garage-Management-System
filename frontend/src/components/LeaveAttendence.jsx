import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export default function LeaveAttendence() {
   const navigate = useNavigate();
  

    const { id } = useParams();
    const [formData, setFormData] = useState({
      username: '',
      arrival_time:'',
      leave_time:'',
      date: '',
    });
  
    useEffect(() => {
      axios.get(`http://localhost:5173/backend/attendence/oneAttent/${id}`)
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
        
      await axios.put(`http://localhost:5173/backend/attendence/setleave/${id}`,{leave_time: ""});
      navigate('/leave')
    } catch (error) {
        // console.error(err)
        alert('Attendence mark error');

}
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <div>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-3 w-48'>
        <input onChange={handleChange} type='email' id='username' defaultValue={formData.username}/>
        <input onChange={handleChange} type='text' id='leave_time' defaultValue={getCurrentTime()} />
        
        <button type='submit'>Evinig</button>
        </form>
        <p>{new Date(formData.arrival_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
        <p>{new Date(formData.leave_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>

    </div>
  )
}

