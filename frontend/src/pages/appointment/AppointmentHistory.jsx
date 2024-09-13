import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointment data from the server
    axios.get("http://localhost:5173/backend/appointment/appoitmentHistory")
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5173/backend/appointment/deleteAppointment/${id}`)
      .then(response => {
        // Remove the deleted appointment from the state
        setAppointments(appointments.filter(appointment => appointment._id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };



  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Appointment History Portal</h2>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <Link to="/createappointment" className="bg-green-500 text-white py-2 px-4 rounded-md mb-4 inline-block">Create another appointment</Link>
          <Link to="/garageManager" className="bg-green-500 text-white py-2 px-4 rounded-md mb-4 inline-block">Garage Manager</Link>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Customer Name</th>
                <th className="py-2 px-4">Customer ID</th>
                <th className="py-2 px-4">Contact Number</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Service Type</th>
                <th className="py-2 px-4">Vehicle Number</th>
                <th className="py-2 px-4">Appointment Date</th>
                <th className="py-2 px-4">Time Slot</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{appointment.customerName}</td>
                  <td className="py-2 px-4">{appointment.customerId}</td>
                  <td className="py-2 px-4">{appointment.contactNumber}</td>
                  <td className="py-2 px-4">{appointment.customerEmail}</td>
                  <td className="py-2 px-4">{appointment.serviceType}</td>
                  <td className="py-2 px-4">{appointment.vehicleNumber}</td>
                  <td className="py-2 px-4">{appointment.appointmentDate}</td>
                  <td className="py-2 px-4">{appointment.timeSlot}</td>
                  <td className="py-2 px-4">
                  {!appointment.absent ? (
                      <>
                        {!appointment.completed ? (
                          <>
                            <Link to={`/appointmenthistory/updateappointment/${appointment._id}`} className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2">Update</Link>
                            <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={(e) => handleDelete(appointment._id)}>Delete</button>
                          </>
                        ) : (
                          <button className="bg-green-500 text-white py-1 px-2 rounded-md">Completed</button>
                        )}
                      </>
                    ) : (
                      <button className="bg-gray-500 text-white py-1 px-2 rounded-md">You were absent</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
