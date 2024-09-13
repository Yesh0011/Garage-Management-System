import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  const isAdmin = currentUser && currentUser.username === 'admin@gmail.com';//12345
  const isSupervisor = currentUser && currentUser.username === 'supervisor@gmail.com';
  const isStaff = currentUser && currentUser.email === 'staff@gmail.com';

  const isfinance = currentUser && currentUser.email === 'financial@gmail.com';//12345

  const isCCcoordinator = currentUser && currentUser.email === 'cccoordinator@gmail.com';//CEH123-PW


  //const isGarageAdmin = currentUser && currentUser.email === 'serviceadmin@gmail.com';


  return (
    <header className='bg-slate-200 shadow-sm'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>E.G</span>
            <span className='text-slate-700'>Motors</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-600' />
        </form>

        <ul className='font-bold flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='text-slate-700 hover:underline'>About</li>
          </Link>
          {currentUser && !isStaff && (
            <Link to={isAdmin ? '/admin' : isSupervisor ? '/progresssupervisor' :isfinance ? '/finacedash' : '/customer '}>
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
            </Link>
          )}
          {(!currentUser || isStaff ) && ( // Render sign in or sign out based on user status
            <Link to='/signin'>
              <li className='text-slate-700 hover:underline'>Sign In</li>
            </Link>
          )}
         
        </ul>

      </div>
    </header>
  );
}
