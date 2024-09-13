import axios from 'axios';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'


export default function Signup() {

  const [formData,setFormData] = useState({})
  const[error,setError] = useState(null);
  const[loading,setLoading] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e)=>{
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
    });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try{
  //     // await axios.post(`http://localhost:3000/backend/employee/EmployeeAdd`)

  //     setLoading(true);
  //     const res = await fetch('/backend/auth/signup',
  //     {
  //       method:'POST',
  //       headers: {
  //         'Content-Type':'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //     if(data.success == false){
  //       setLoading(false);
  //       setError(data.message);
  //       return;

  //     }
  //     setLoading(false);
  //     setError(null);
  //     navigate('/employee');

  //   }catch(error){
  //     setLoading(false);
  //     setError(error.message);


  //   }
    
    
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      setLoading(true);
  
      const res1 = await axios.post('http://localhost:5173/backend/employee/EmployeeAdd', formData);
  
      const res2 = await axios.post('http://localhost:5173/backend/auth/signup', formData);
  
      const data1 = res1.data;
      const data2 = res2.data;
  
      console.log('Response from first endpoint:', data1);
      console.log('Response from second endpoint:', data2);
  
      if (data1.success === false) {
        setLoading(false);
        setError(data1.message);
        return;
      }
  
      if (data2.success === false) {
        setLoading(false);
        setError(data2.message);
        return;
      }
  
      setLoading(false);
      setError(null);
      navigate('/employee');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='empname'className='border p-3 rounded-lg' id='empname'onChange={handleChange}/>
        <input type="phone" placeholder='phone_number'className='border p-3 rounded-lg' id='phone_number'onChange={handleChange}/>
        <input type="email" placeholder='username'className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type="password" placeholder='password'className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ?'Loading...':'Sign up'}</button>
        
      </form>
      
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}