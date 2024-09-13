import React, { useEffect, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Dailyupdate() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    vehiclenumber: '',
    details: '',
    date: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/daily/onestatus/${id}`)
      .then((res) => {
         setFormData(res.data);
      })
      .catch((error) => {
          console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/backend/daily/updateStatus/${id}`, formData);
      await axios.post('http://localhost:5173/backend/statushistory/createStatushistory', formData);
      alert('Status update successful');
      navigate('/allstatus');
    } catch (err) {
      console.error(err);
      alert('Error updating daily status');
    }
  };

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false); 

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      // Check if all required fields are filled
      if (!to || !subject || !text) {
        alert('Please fill in all fields (To, Subject, Message) before sending the email.');
        return;
      }
  
      await axios.post('http://localhost:5173/backend/email/sentEmail', {
        to,
        subject,
        text,
      });
      alert('Email sent successfully');
      navigate('/vreport');
    } catch (err) {
      console.error(err);
      alert('Error sending email');
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ display: 'flex', padding: '0px' }}>
      <div style={{ width: '250px', background: 'black', padding: '0px' }}>
        <Repairdashboard />
      </div>
      <div className='mx-auto p-7'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>Update Daily Status</h1>


      
        {!showEmailForm && (
        <form onSubmit={handleEdit} className='flex flex-col gap-4 '>
          <input onChange={handleChange} type='email' placeholder='Email' id='email' value={formData.email} className='border p-3 rounded-lg w-96 bg-slate-900 text-white' disabled />

          <input onChange={handleChange} type='text' id='vehiclenumber' value={formData.vehiclenumber} className='border p-3 rounded-lg w-96 bg-slate-900 text-white' disabled />

          <input onChange={handleChange} type='text' id='date' className='border p-3 rounded-lg w-96 bg-slate-900 text-white' value={getCurrentDate()} disabled />

          <input onChange={handleChange}  id='details' value={formData.details} className='border p-3 rounded-lg w-96 bg-slate-900 text-white' />
          
          
          <button type='submit' className='bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'>
            Update
          </button>
        </form>
           )}

        

        {showEmailForm && (
          <div >
            <form onSubmit={handleEmail} className='flex flex-col gap-7 p-9 '>

            <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='to'
           
            
            onChange={(e) => setTo(e.target.value)}
          >
           <option disabled selected hidden>
              Email
            </option> 
            <option value={formData.email}>{formData.email}</option>
            
          </select>


          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='subject'
           
            
            onChange={(e) => setSubject(e.target.value)} 
          >
           <option disabled selected hidden>
              Subject
            </option> 
            <option value={"About vehicle"}>About vehicle</option>
            
          </select>


          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='text'
           
            
            onChange={(e) => setText(e.target.value)} type='text'          >
           <option disabled selected hidden>
              Message
            </option> 
            <option value={"Your " + formData.vehiclenumber + " vehicle repair has been completed."}>{"Your " + formData.vehiclenumber + " vehicle repair has been completed."}</option>
            
          </select>


              {/* <input onChange={(e) => setTo(e.target.value)} type='email' defaultValue={formData.email}   placeholder='Email' id='to' className='border p-3 rounded-lg w-96 bg-slate-900 text-white' /> */}
              {/* <input onChange={(e) => setSubject(e.target.value)}  type='text' placeholder='Subject' defaultValue={"About vehicle"} id='subject' className='border p-3 rounded-lg w-96 bg-slate-900 text-white' /> */}
              {/* <input onChange={(e) => setText(e.target.value)} type='text'  placeholder='Message' defaultValue={"Your " + formData.vehiclenumber + " vehicle repair has been completed."} id='text' className='border p-3 rounded-lg w-96 bg-slate-900 text-white' /> */}
              <button type='submit' className='w-96 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'>
                Sent
              </button>
            </form>
          </div>
        )}

{!showEmailForm && (
      <button onClick={() => setShowEmailForm(true)} style={{ position:'relative', top:'30px' }} className=' w-96 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'>
          Finish
        </button>

)}
      </div>
    </div>
  );
}
