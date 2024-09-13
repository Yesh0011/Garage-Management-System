import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    empname: "",
    phone_number: "",
    username: "",
    password: ""
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:5173/backend/user/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`http://localhost:5173/backend/user/update2/${id}`, user);
      setUpdateSuccess(true);
      setTimeout(() => {
        navigate("/employee");
      }, 3000); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/employee">
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-20 h-15 mt-5 my-5'>Back</button>
      </Link>
      <div className='p-3 max-w-lg mx-auto'>
        <h3 className='text-3xl text-center font-semibold my-7'>Update Employee</h3>
        {updateSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> User successfully updated.</span>
          </div>
        )}
        <form className='flex flex-col gap-4' onSubmit={submitForm}>
          <input type="text" onChange={inputChangeHandler} value={user.empname} name="empname" placeholder='empname' className='border p-3 rounded-lg' id='empname' />
          <input type="phone" onChange={inputChangeHandler} value={user.phone_number} name="phone_number" placeholder='phone_number' className='border p-3 rounded-lg' id='phone_number' />
          <input type="email" onChange={inputChangeHandler} value={user.username} name="username" placeholder='username' className='border p-3 rounded-lg' id='username' />
          <input type="password" onChange={inputChangeHandler} value={user.password} name="password" placeholder='password' className='border p-3 rounded-lg' id='password' />
          <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update Employee</button>
        </form>
      </div>
    </div>
  );
}
