import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function UpdateAppointment() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [serviceType, setServiceType] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const navigate = useNavigate();

  // Retrieve data from database
  useEffect(() => {
    axios.get(`http://localhost:5173/backend/appointment/oneAppointment/${id}`)
      .then(result => {
        setSelectedDate(new Date(result.data.appointmentDate))
        setCustomerName(result.data.customerName);
        setCustomerId(result.data.customerId);
        setContactNumber(result.data.contactNumber);
        setCustomerEmail(result.data.customerEmail);
        setServiceType(result.data.serviceType);
        setVehicleModel(result.data.vehicleModel);
        setVehicleNumber(result.data.vehicleNumber);
        setTimeslot(result.data.timeSlot);
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  // Send updated data to the database
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5173/backend/appointment/updateAppointment/${id}`, {
      customerName: customerName,
      customerId: customerId,
      contactNumber: contactNumber,
      customerEmail: customerEmail,
      serviceType: serviceType,
      vehicleModel: vehicleModel,
      vehicleNumber: vehicleNumber,
      appointmentDate: selectedDate,
      timeSlot: timeslot,
    })
      .then(() => {
        alert('Appointment Updated Successfully');
        navigate('/appointmenthistory');
      })
      .catch(err => {
        console.log(err);
      });
  }

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
    'AC Service',
  ];

  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-gray-500 rounded shadow-lg px-8 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Appointment</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-lg text-gray-800 mb-2">Customer Name:</label>
            <input type="text" id="customerName" name="customerName" className="border rounded py-2 px-3 w-full" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="customerId" className="block text-lg text-gray-800 mb-2">Customer ID:</label>
            <input type="text" id="customerId" name="customerId" className="border rounded py-2 px-3 w-full" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-lg text-gray-800 mb-2">Contact Number:</label>
            <input type="text" id="contactNumber" name="contactNumber" className="border rounded py-2 px-3 w-full" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="customerEmail" className="block text-lg text-gray-800 mb-2">Customer Email:</label>
            <input type="text" id="customerEmail" name="customerEmail" className="border rounded py-2 px-3 w-full" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-lg text-gray-800 mb-2">Service Type:</label>
            <select id="serviceType" name="serviceType" value={serviceType} onChange={handleServiceTypeChange} className="border rounded py-2 px-3 w-full">
              <option value="">Service Type</option>
              {serviceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="vehicleModel" className="block text-lg text-gray-800 mb-2">Vehicle Model:</label>
            <input type="text" id="vehicleModel" name="vehicleModel" className="border rounded py-2 px-3 w-full" value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="vehicleNumber" className="block text-lg text-gray-800 mb-2">Vehicle Number:</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" className="border rounded py-2 px-3 w-full" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-lg text-gray-800 mb-2">Appointment Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="border rounded py-2 px-3 w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="timeslot" className="block text-lg text-gray-800 mb-2">Preferred Time Slot:</label>
            <select id="timeslot" name="timeslot" value={timeslot} onChange={handleTimeSlotChange} className="border rounded py-2 px-3 w-full">
              <option value="">Select a timeslot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Submit</button>
        </form>
      </div>
    </div>
  );
}
