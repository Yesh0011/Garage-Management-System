import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BuyerEdit() {
        const { id } = useParams();
        const [formData, setFormData] = useState({
          fName: '',
          lName: '',
          nic: '',
          phone: '',
          email: ''
        });
        const navigate = useNavigate();
      
        useEffect(() => {
          axios.get(`http://localhost:5173/backend/checkout/oneBuyer/${id}`)
            .then(result => {
              console.log(result);
              const { fName, lName, nic, phone, email } = result.data;
              setFormData({ fName, lName, nic, phone, email });
            })
            .catch(err => console.log(err));
        }, [id]);
        
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData(prevState => ({
            ...prevState,
            [name]: value
          }));
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          axios.put(`http://localhost:5173/backend/checkout/updateBuyer/${id}`, formData)
            .then(result => {
              console.log(result);
              navigate('/buyer');
            })
            .catch(err => console.log(err));
        };
      
        return (
          <div className="bg-cover bg-no-repeat bg-center w-full h-full" style={{backgroundImage: "url(/Lambogini.jpg)"}}>
            <div className='max-h-screen flex items-center justify-center bg-gray-0'>
              <div className='min-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
                <div className="text-center">
                  <h1 className="text-4xl p-4">
                    <span className="text-yellow-600 font-semibold">Buyer</span>
                    <span className="text-white font-semibold">Edit</span>
                  </h1>
                </div>
                <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                  <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-500 p-8 mb-4 rounded-lg w-full md:w-1/2'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex gap-3 items-center'>
                        <label htmlFor='fName' className='form-control'>First Name:</label>
                        <input type='text' placeholder='Enter First Name' className='border p-2 rounded-lg bg-gray-400 placeholder-white font-semibold' id='fName' name='fName' 
                          onChange={handleChange} value={formData.fName} />
                      </div>
                      <div className='flex gap-3 items-center'>
                        <label htmlFor='lName' className='form-control'>Last Name:</label>
                        <input type='text' placeholder='Enter Last Name' className='border p-2 rounded-lg bg-gray-400 placeholder-white font-semibold' id='lName' name='lName' 
                          onChange={handleChange} value={formData.lName} />
                      </div>
                      <div className='flex gap-3 items-center'>
                        <label htmlFor='nic' className='form-control'>NIC:</label>
                        <input type='text' placeholder='Enter NIC' className='border p-2 rounded-lg bg-gray-400 placeholder-white font-semibold' id='nic' name='nic' 
                          onChange={handleChange} value={formData.nic} />
                      </div>
                      <div className='flex gap-3 items-center'>
                        <label htmlFor='phone' className='form-control'>Phone:</label>
                        <input type='text' placeholder='Enter Date' className='border p-2 rounded-lg bg-gray-400 placeholder-white font-semibold' id='phone' name='phone' 
                          onChange={handleChange} value={formData.phone} />
                      </div>
                      <div className='flex gap-3 items-center'>
                        <label htmlFor='email' className='form-control'>Email:</label>
                        <input type='email' placeholder='Enter your email address' className='border p-2 rounded-lg bg-gray-400 placeholder-white font-semibold' id='email' name='email' 
                          onChange={handleChange} value={formData.email} />
                      </div>
                    </div>
                    <div className='flex justify-center gap-4 my-2'>
                      <button
                          type="submit"
                          className="btn btn-primary bg-yellow-600 text-black font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs"
                      >
                          Save Changes
                      </button>
                      <Link
                          to="/buyer"
                          className="btn btn-outline-primary bg-yellow-600 text-bblack font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs text-center"
                      >
                          Cancel
                      </Link>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
