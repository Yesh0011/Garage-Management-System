import React, { useEffect, useState } from 'react';
import Customerdashboard from '../components/Customerdashboard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CustomerView() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { email } = useParams();
  const [clicked, setClicked] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [hideNoButton, setHideNoButton] = useState(false);

  const [formData, setFormData] = useState({
    _id : '',
    email: '',
    vehiclenumber: '',
    engine: '',
    tyre: '',
    parts: '',
    date: '',
    vehicle: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/backend/issues/customerview/${currentUser.email}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser.email) {
      fetchUserData();
    }
  }, [currentUser.email]);


  const handleClick = () => {
    setClicked(true);
    setConfirmation(true);
    setHideNoButton(true);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5173/backend/issues/updateIssue/${formData._id}`, {approvel: 'No'});
      console.log(res.data);
      navigate('/requirments');
    } catch (error) {
      console.error('Error updating issue:', error);
    }

}


  return (
    <div style={{ display: 'flex', padding: '0px' }}>
      <div style={{ width: '250px', background: 'black', padding: '0px' }}><Customerdashboard /></div>
      <div className='mx-auto'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>Vehicle Status</h1>


        <div  className="flex flex-col gap-4">
          <img src={formData.vehicle} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
          {clicked && (
        <div className='text-green-600 font-bold mt-3'>Thank you for your response!</div>
      )} 
        
        <table className='gap-4 p-5'>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Email :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{formData.email}</td>
          </tr>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Vehicle Number :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{formData.vehiclenumber}</td>
          </tr>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Engine :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{formData.engine}</td>
          </tr>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Tyre :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{formData.tyre}</td>
          </tr>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Parts :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{formData.parts}</td>
          </tr>
          <tr>
            <td className='border p-3 rounded-lg w-40 bg-slate-900 text-white'>Date :</td>
            <td className='border p-3 rounded-lg w-96 bg-slate-900 text-white'>{new Date(formData.date).toLocaleDateString()}</td>
          </tr>
        </table>

        {/* <p className='text-black'>{formData._id}</p> */}

      <p className=' font-medium text-red-700'>Do you give approvel for repair start?</p>
        
      <div className='flex gap-96'>
      <button
        onClick={handleClick}
        className='w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'
      >
        Yes
      </button>

      {!confirmation && !hideNoButton && ( // Only render if confirmation is false and hideNoButton is false
        <form onSubmit={handleSubmit}>
          <input type='text' value="No" hidden id='approvel' />
          <button
            type='submit'
            className='w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'
          >
            No
          </button>
        </form>
      )}
    </div>
        </div>
      </div>
    </div>
  );
}
