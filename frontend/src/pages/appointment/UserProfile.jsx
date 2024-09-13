import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Appointment history');
  // State to store loyalty points count
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const userId = "66349fcca1219729c62984ee"; // User ID provided

    // Fetch the count of completed appointments for the specified user ID
    axios.get(`http://localhost:5173/backend/appointment/userProfile/${userId}`)
      .then(response => {
        // Set the count of completed appointments received from the backend
        setCompletedAppointmentsCount(response.data.count);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 w-64">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Navigation</h1>
          <button
            className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Appointment history' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
            onClick={() => handleTabClick('Appointment history')}
          >
            Appointment history
          </button>
          <button
            className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Loyalty points' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
            onClick={() => handleTabClick('Loyalty points')}
          >
            Loyalty points
          </button>
          <button
              className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Accident management' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
              onClick={() => handleTabClick('Accident management')}
            >
  Accident Management
</button>
<button
    className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Vehicle details' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
    onClick={() => handleTabClick('Vehicle details')}
  >
    Vehicle Details
  </button>

  <button
    className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Daily status' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
    onClick={() => handleTabClick('Daily status')}
  >
    Daily Status
  </button>

  <button
    className={`block w-full py-2 px-4 rounded-md ${activeTab === 'Report' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
    onClick={() => handleTabClick('Report')}
  >
    Report
  </button>
          {/* Add other navigation buttons */}
        </div>
        <div className="mt-20 p-4">
          <button className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="bg-yellow-200 p-4 rounded-md h-1/3">
          <h1 className="text-2xl font-bold mb-4">Profile Content</h1>
          {/* Profile content */}
        </div>
      </div>
      {/* Second container */}
      <div className="flex-1 p-4">
  <div className="bg-yellow-200 p-4 rounded-md h-1/3 flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold mb-4">Loyalty Point</h1>
    {/* Display loyalty points count and button */}
    <div className="flex items-center">
    <p className="text-9xl text-red-500">{loyaltyPoints}</p>
            {(loyaltyPoints >= 3 && loyaltyPoints < 8) && (
              <button className="bg-green-500 text-white py-1 px-2 rounded-md ml-4">Claim discount</button>
            )}
     </div>
  </div>
</div>

    </div>
  );
}

export default UserProfile;
