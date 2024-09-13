import React from 'react'
import { FaBook, FaEdit, FaEnvelope, FaEye, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Repairdashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1rem', color: 'white' }}>
        <div className="text-xl font-bold mb-4">Dashboard</div>
        <ul className='font-bold'>
          <Link to="/haryup">
            <li className="py-2 border p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md cursor-pointer flex">
              <FaBook className="mr-2" />Harryup
            </li>
          </Link>
          <Link to="/repairissue">
            <li className="py-2 border p-3 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer flex">
              <FaEnvelope className="mr-2" />Repair Issues
            </li>
          </Link>
          <Link to="/view">
            <li className="py-2 border p-3 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer flex">
              <FaEye className="mr-2" />Issues
            </li>
          </Link>
          <Link to="/reaction">
            <li className="py-2 border p-3 bg-green-500 hover:bg-green-600 text-white rounded-md cursor-pointer flex">
              <FaHeart className="mr-2" />Customer Reaction
            </li>
          </Link>
          <Link to="/allstatus">
            <li className="py-2 border p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer flex">
              <FaEdit className="mr-2" />Daily Status
            </li>
          </Link>
          <Link to="/vreport">
            <li className="py-2 border p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer flex">
              <FaEdit className="mr-2" />Report
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex-1 p-4">
        {/* Add image or other content here */}
      </div>
    </div>
  )
}
