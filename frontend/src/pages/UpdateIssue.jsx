import React, { useEffect, useRef, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import car1 from '../Image/car1.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';

const styles = {
  backgroundImage: `url(${car1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '140vh',
};

export default function UpdateIssue() {
  const fileRef = useRef(null);
  const [fileUplardError, setFileIploadError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const navigate = useNavigate();


  const { id } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    vehiclenumber: '',
    engine: '',
    tyre: '',
    parts: '',
    date: '',
    vehicle: '', // Assuming this is for storing the image URL
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios.get(`http://localhost:5173/backend/issues/oneIssue/${id}`)
    .then((res) => {
       setFormData(res.data);
    })
    .catch((error) => {
        console.log(error);
    })

} , [id])

  const handleImageUpload = async () => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + formData.vehicle.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, formData.vehicle);
      
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        setFilePerc(Math.round(progress));

      }, (error) => {
        // console.log(error);
        setFileIploadError(true);

      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, vehicle: downloadURL });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/backend/issues/updateIssue/${id}`, formData);
      console.log(res.data);
      navigate('/view');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex bd-im' style={styles}>
      <div style={{ width: '250px', height: '784px', background: 'black', padding: '0px' }}>
        <Repairdashboard />
      </div>
      <div className='mx-auto'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>Vehicle Status</h1>
        <form className='flex flex-col gap-4 p-5' onSubmit={handleSubmit}>
           <input
            type='file'
            onChange={(e) => setFormData({ ...formData, vehicle: e.target.files[0] })}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='vehicle'
            hidden accept="image/*"
            ref={fileRef}
          />
          
          <img onClick={() => fileRef.current.click()} src={formData.vehicle} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' alt='vehicle' />
          <p className="text-sm self-center">
          {fileUplardError ?
            (<span className= " bg-black text-red-700">Error Image Upload(image must be less than 2mb)</span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className="text-white  bg-black">{`Uploading ${filePerc}%`}</span>
            ) :
              filePerc === 100 ? (
                <span className="text-green-700 bg-black">Image Successfully Uploaded!</span>
              ) : (
                  ''
                )}
        </p>
          <button type='button' onClick={handleImageUpload} className='border  w-24 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase  font-bold hover:opacity-90 disabled:opacity-80'>
            Upload
          </button>
          
          
          
          <input
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='email'
          />
          <input
            type='text'
            placeholder='Vehicle Number'
            value={formData.vehiclenumber}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='vehiclenumber'
          />
          <select
            value={formData.engine}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='engine'
          >
            <option value=''>Select Engine</option>
            <option value='good'>Good</option>
            <option value='bad'>Bad</option>
            <option value='very bad'>Very Bad</option>
          </select>
          <input
            type='text'
            placeholder='Tyre Condition'
            value={formData.tyre}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='tyre'
          />
          <input
            type='text'
            placeholder='Parts'
            value={formData.parts}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='parts'
          />
          <input
            type='date'
            value={formData.date}
            onChange={inputChange}
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            name='date'
          />
          
          <button type='submit' className='bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
