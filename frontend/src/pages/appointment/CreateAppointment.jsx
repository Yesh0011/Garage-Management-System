import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const [completed, setCompleted] = useState(false);
  const [absent, setAbsent] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotChange = (e) => {
    setTimeslot(e.target.value);
  };

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value);
  };

  const timeSlots = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
    '18:00-19:00',
  ];

  const serviceTypes = [
    'Oil Change',
    'Tire Rotation',
    'Brake Inspection',
    'Engine Tune-Up',
    'Wheel Alignment',
    'Battery Replacement',
    'Transmission Service',

  ];
  
  const validateForm = () => {
    if (!/^\d{10}$/.test(contactNumber)) {
      window.alert('Contact number must contain 10 digits');
      return false;
    }

    if (!/^\d+$/.test(customerId)) {
      window.alert('Customer ID must contain only numbers');
      return false;
    }

    if (/\d/.test(customerName)) {
      window.alert('Customer name cannot contain numerical values');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    axios.post("http://localhost:5173/backend/appointment/createAppointment", {
      customerName: customerName,
      customerId: customerId,
      contactNumber: contactNumber,
      customerEmail: customerEmail,
      serviceType: serviceType,
      vehicleModel: vehicleModel,
      vehicleNumber: vehicleNumber,
      appointmentDate: selectedDate,
      timeSlot : timeslot,
      completed : completed,
      absent: absent,
    })
      .then(() => {
        alert('Appointment Submitted Successfully');
        navigate('/appointmenthistory');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-gray-500 rounded shadow-lg px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Submit Your Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-lg text-gray-300">Customer Name:</label>
            <input type="text" id="customerName" name="customerName" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setCustomerName(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="customerId" className="block text-lg text-gray-800">Customer ID:</label>
            <input type="text" id="customerId" name="customerId" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setCustomerId(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-lg text-gray-800">Contact Number:</label>
            <input type="text" id="contactNumber" name="contactNumber" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setContactNumber(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="customerEmail" className="block text-lg text-gray-800">Customer Email:</label>
            <input type="text" id="customerEmail" name="customerEmail" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setCustomerEmail(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-lg text-gray-800">Service Type:</label>
            <select id="serviceType" name="serviceType" onChange={handleServiceTypeChange} className="border rounded py-2 px-3 w-full mt-2">
              <option value="">Service Type</option>
              {serviceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="vehicleModel" className="block text-lg text-gray-800">Vehicle Model:</label>
            <input type="text" id="vehicleModel" name="vehicleModel" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setVehicleModel(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="vehicleNumber" className="block text-lg text-gray-800">Vehicle Number:</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" className="border rounded py-2 px-3 w-full mt-2" 
              onChange={(e) => setVehicleNumber(e.target.value)}/>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-lg text-gray-800">Appointment Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="border rounded py-2 px-3 w-full mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="timeslot" className="block text-lg text-gray-800">Preferred Time Slot:</label>
            <select id="timeslot" name="timeslot" onChange={handleTimeSlotChange} className="border rounded py-2 px-3 w-full mt-2">
              <option value="">Select a timeslot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">Submit</button>
        </form>
      </div>
    </div>
  );
}
