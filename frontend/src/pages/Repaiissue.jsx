import React, { useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import car1 from '../Image/car1.jpg';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const styles = {
  backgroundImage: `url(${car1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '110vh',
};

export default function Repaiissue() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUplardError, setFileIploadError] = useState(false);

  const handleImage = async () => {
    try {
      if (!file) {
        setError('Please select an image');
        return;
      }
      setError(null);
      setLoading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          setFilePerc(Math.round(progress));
        },
        (error) => {
          setLoading(false);
          // setError('Image upload failed');
          setFileIploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, vehicle: downloadURL });
            setUploadSuccess(true);
          });
          setLoading(false);
          alert('Image uploaded successfully');
        }
      );
    } catch (error) {
      setLoading(false);
      setError('Image upload failed');
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const vehicleNumberPattern = /^[A-Z]{2}-\d{4}$/; 
      if (!formData.vehiclenumber || !vehicleNumberPattern.test(formData.vehiclenumber)) {
        alert('Please enter a valid vehicle number in the format AB-1212.');
        
        setLoading(false);
        return;
      }
      const res = await fetch('backend/issues/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigate('/view');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleNumberChange = (e) => {
    const vehicleNumber = e.target.value.trim(); 
    const vehicleNumberPattern = /^[A-Z]{2}-\d{4}$/; // AB-1212 pattern
  
    if (vehicleNumber === '' || vehicleNumberPattern.test(vehicleNumber)) {
      setFormData({ ...formData, vehiclenumber: vehicleNumber });
      setError(null);
    } else {
      setError('Invalid vehicle number');
    }
  };

  return (
    <div className='flex bd-im' style={styles}>
      <div style={{ width: '250px', height: '615px', background: 'black', padding: '0px' }}>
        <Repairdashboard />
      </div>
      <div className='mx-auto'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>Vehicle Status</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-5'>
        <div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              placeholder='Vehicle Photo'
              className='border p-3 rounded-lg w-72 bg-slate-900 text-white'
              id='vehicle'
              accept='image/*'
            />
            <button type='button' className='border p-3 rounded-lg w-24 bg-slate-900 text-green-800 uppercase font-semibold' onClick={handleImage}>
              Upload 
            </button>
            <p className="text-sm self-center">
          {fileUplardError ?
            (<span className="text-red-700">Error Image Upload(image must be less than 2mb)</span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className="text-green-700">{`Uploading ${filePerc}%`}</span>
            ) :
              filePerc === 100 ? (
                <span className="text-green-700">Image Successfully Uploaded!</span>
              ) : (
                  ''
                )}
        </p>
            
            {/* {uploadSuccess && <div className='text-green-500'>Image uploaded successfully!</div>} */}
            {error && <div className=' bg-white text-red-500'>{error}</div>}
          </div>

          <input
            type='email'
            placeholder='Email'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='email'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type='text'
            placeholder='Vehicle'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='vehiclenumber'
            onChange={handleVehicleNumberChange}
          />
          
          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='engine'
            name='engine'
            
            onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
          >
            <option disabled selected hidden>
              Engine
            </option>
            <option value='good'>Good</option>
            <option value='bad'>Bad</option>
            <option value='very bad'>Very Bad</option>
          </select>
          <input
            type='text'
            placeholder='Tyre'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='tyre'
            onChange={(e) => setFormData({ ...formData, tyre: e.target.value })}
          />
          <input
            type='text'
            placeholder='Parts'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='parts'
            onChange={(e) => setFormData({ ...formData, parts: e.target.value })}
          />
          <input
            type='date'
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='date'
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <button
            disabled={loading}
            className='bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-xl font-bold hover:opacity-90 disabled:opacity-80'
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        
      </div>
    </div>
  );
}
