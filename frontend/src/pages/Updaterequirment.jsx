import React, { useEffect, useState } from 'react';
import Customerdashboard from '../components/Customerdashboard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Updaterequirment() {


    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { email } = useParams();

    const [formData, setFormData] = useState({
        _id : '',
        email: '',
        vehiclenumber: '',
        engine: '',
        tyre: '',
        parts: '',
        approvel:'',
        rdate: '',
        time: '',
        additional: '' ,
        update: '',
        
       
      });


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:5173/backend/reaction/customerviewrequirment/${currentUser.email}`);
            setFormData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (currentUser.email) {
          fetchUserData();
        }
      }, [currentUser.email]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    

        //   await axios.put(`/backend/reaction/updaterequirment'/${id}`, formData);
          const res = await axios.put(`/backend/reaction/updaterequirment/${formData._id}`, formData);
          // const res = await axios.put(`/backend/reaction/updaterequirment/${formData._id}`, {
          //   ...formData,
          //   update: true,
          // });
          
      console.log(res.data);
          if(formData.update === true){
            alert('You can not access update again');


          }
          if(formData.update === false){
            alert('Requirments update succesfully');


          }


          
    
        } catch (err) {
         alert('Error update daily status');
        }
      };

      const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    //   const currentTime = new Date().getTime(); // Current time in milliseconds
    //           const repairTime = new Date(formData.time).getTime(); // Convert repair time to milliseconds
    //           const timeDifferenceMs =currentTime - repairTime  ; // Difference in milliseconds
    //           const timeDifference = new Date(timeDifferenceMs).toISOString().substr(11, 8);
    

  return (
    <div style={{ display: 'flex', padding: '0px' }}>
      <div style={{ width: '250px', background: 'black', padding: '0px' }}>
        <Customerdashboard />
      </div>
      <div className='mx-auto'>
        <h1 className='text-3xl text-center font-bold my-5 text-yellow-500'>Approvel</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>

          <input onChange={handleChange} type='email' id='email' defaultValue={formData.email} hidden/>
          <input onChange={handleChange} type='text' id='vehiclenumber' defaultValue={formData.vehiclenumber} hidden/>
          <input onChange={handleChange} type='date' id='rdate' defaultValue={getCurrentDate()} disabled hidden />
          <input onChange={handleChange} type='text' id='time' defaultValue={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace(/:/g, '.')} hidden/>
          <input onChange={handleChange} type='text' id='approvel' defaultValue={formData.approvel} hidden/>

          {/* <div>
            <input  type="checkbox" id="engine" value="Check Engine" />
            <label className='text-black font-semibold' htmlFor="checkEngine">Check Engine</label>
          </div> */}

          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='engine'
            name='engine'
            defaultValue={formData.engine}
            onChange={handleChange}
          >
            <option disabled selected hidden>
              Engine
            </option>
            <option value='Check engine'>Check Engine</option>
            <option value='Do not check engine'> Don't Check Engine</option>
            
          </select>

          {/* <div>
            <input onChange={handleChange} type="checkbox" id="tyre" value="Add Tyre" />
            <label className='text-black font-semibold' htmlFor="addTyre">Add Tyre</label>
          </div> */}

          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='tyre'
            name='tyre'
            defaultValue={formData.tyre}

            
            onChange={handleChange}
          >
            <option disabled selected hidden>
              Tyre
            </option>
            <option value='Add tyre'>Add Tyre</option>
            <option value='Do not add tyre'> Don't Add Tyre</option>
            
          </select>

          {/* <div>
            <input onChange={handleChange} type="checkbox" id="parts" value={`Add ${formData.parts}`} />
            <label className='text-black font-semibold' htmlFor="addParts">{'Add ' + formData.parts}</label>
          </div> */}


          <select
            className='border p-3 rounded-lg w-96 bg-slate-900 text-white'
            id='parts'
            name='parts'
            defaultValue={formData.parts}

            
            onChange={handleChange}
          >
           <option disabled selected hidden>
              Parts
            </option> 
            <option value={`Add ${formData.parts}`}>{'Add ' + formData.parts}</option>
            <option value={`Do not Add  ${formData.parts}`}> {'Do not Add ' + formData.parts}</option>
            
          </select>

          <input
            onChange={handleChange}
            className='border p-3 rounded-lg bg-slate-900 text-white w-96'
            defaultValue={formData.additional}
            type='text'
            id='additional'
            placeholder='Add Additional'
          />



          <button
            type='submit'
            className=' w-96 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-black rounded-lg p-3 uppercase text-sm font-bold hover:opacity-90 disabled:opacity-80'
          >
            Update
          </button>
        </form>



        
      

      </div>
    </div>
  );
}
