import  { useEffect, useState } from 'react';
import Admindashboard from '../components/Admindashboard'

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function Employee() {
 



const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    height: '100vh', 
    overflow: 'auto', 
  },
  tableContainer: {
    width: '80%', 
    margin: '20px auto', 
    overflowX: 'auto', 
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    position: 'sticky',
    top: 0,
    background: '#f2f2f2',
    zIndex: 1,
  },
  td: {
    display: 'flex',
    gap: '5px',
  },
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/backend/user/getall");
        setUsers(response.data);
        setFilterData(response.data); // Update filterdata state here
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const getSearch = event.target.value.toLowerCase();
  setQuery(getSearch);

  if (getSearch.length > 0) {
    const searchData = filterdata.filter((item) => item.username.toLowerCase().includes(getSearch));
    setUsers(searchData);
  } else {
    setUsers(filterdata);
  }
  };

  const deleteUser2 = async (userId) => {
    await axios.delete(`http://localhost:5173/backend/user/delete2/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='row mt-3'>

<div className="flex justify-center items-center ">
      <Link to='/signup'>
    <button className="bg-blue-800 rounded-lg border p-3 text-white hover:bg-blue-900 m-7">
      + Add Employee
    </button>
    </Link>
    </div>
    <div  className='flex justify-between'>
      <Admindashboard/>
    </div>
      <div className='col-md-12 mt-3 mb-3'>
        
        <div className='col-md-6'>
          <input type="text" name='email' value={query} className='form.control' onChange={(e) => handleSearch(e)} placeholder='search email' />
        </div>
      </div>
      <div style={styles.tableContainer}>
        <table hoverable className='mt-5 shadow-md' style={styles.table} border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th style={styles.th}>Emp_no</th>
              <th style={styles.th}>Emp_name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.empname}</td>
                <td>{user.phone_number}</td>
                <td>{user.username}</td>
                <td style={styles.td}>
                  <button className='text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-red-500' onClick={() => deleteUser2(user._id)}>Delete</button>
                  <Link to={`/edituser/${user._id}`}>
                    <button className='bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


}


