import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';


export default function GarageManager() {
    const [appointments, setAppointments] = useState([]);
    const [filterdata, setFilterdata]= useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
 

    useEffect(() => {
        // Fetch appointment data from the server
        axios.get("http://localhost:5173/backend/appointment/garageManager")
            .then(response => {
                // Filter out appointments with absent value as true
                const filteredAppointments = response.data.filter(appointment => appointment.absent !== true);
                
                setAppointments(filteredAppointments);
                setFilterdata(filteredAppointments);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    

    // Function to sort time slots for each day
    const sortTimeSlotsForDay = (appointmentsForDay) => {
        return appointmentsForDay.sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
    };


    const handleRemoveAppointment = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this appointment?");
        if (isConfirmed) {
            axios.put(`http://localhost:5173/backend/appointment/updateabsent/${id}`)
            .then(response => {
                setAppointments(appointments.map(appointment => {
                }));
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }
    window.location.href = window.location.href;

};
    
    const handleCompleteAppointment = (id) => {        
        const isConfirmed = window.confirm("Are you sure you want to mark this appointment as completed?");
        if (isConfirmed) {
            axios.put(`http://localhost:5173/backend/appointment/updatecomplte/${id}`)
                .then(response => {
                    setAppointments(appointments.map(appointment => {
                    }));
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });

        }
        window.location.href = window.location.href;

    };
    

        //search function
        const handlesearch = (e) => {
            const getSearch = e.target.value.toLowerCase(); // Convert search query to lowercase
            if (getSearch.length > 0) {     
                const searchdata = appointments.filter((item) => 
                    item.customerId.toString().includes(getSearch)   ||
                    item.serviceType.toLowerCase().includes(getSearch) // Check customerId
                );
                setAppointments(searchdata);
            } else {
                setAppointments(filterdata);
            }
            setQuery(getSearch);
        }
        

        const handleGenerate = () => {
            const doc = new jsPdf();
    
            // Add title to the document
            doc.text("Appointment Report", 14, 10);
    
            // Filter appointments where absent is not true
    const filteredAppointments = appointments.filter(appointment => appointment.absent !== true);
    
            // Define columns for the table
            const columns = [
                { title: "Customer Name", dataKey: "customerName" },
                { title: "Customer ID", dataKey: "customerId" },
                { title: "Contact Number", dataKey: "contactNumber" },
                { title: "Service Type", dataKey: "serviceType" },
                { title: "Vehicle Model", dataKey: "vehicleModel" },
                { title: "Vehicle Number", dataKey: "vehicleNumber" },
                { title: "Time Slot", dataKey: "timeSlot" },
                { title: "Status", dataKey: "completed" }
            ];
    
            // Map appointment data to rows for the table
            const rows = filteredAppointments.map(appointment => ({
                customerName: appointment.customerName,
                customerId: appointment.customerId,
                contactNumber: appointment.contactNumber,
                serviceType: appointment.serviceType,
                vehicleModel: appointment.vehicleModel,
                vehicleNumber: appointment.vehicleNumber,
                timeSlot: appointment.timeSlot,
                completed: String(appointment.completed)
            }));
    
            // Add auto table to the document using the filtered appointment data
            doc.autoTable({
                head: [columns.map(column => column.title)],
                body: filteredAppointments.map(appointment => [
                    appointment.customerName,
                    appointment.customerId,
                    appointment.contactNumber,
                    appointment.serviceType,
                    appointment.vehicleModel,
                    appointment.vehicleNumber,
                    appointment.timeSlot,
                    String(appointment.completed)
                ]),
                startY: 20
            });

            // Additional text at the very bottom of the report
            const currentDate = new Date().toLocaleDateString();
            doc.text(`This is a report generated by EG motors. Date: ${currentDate}`, 14, doc.internal.pageSize.height - 10);

    
            // Save the document
            doc.save('appointment_report.pdf');
        }


    return (

        
        <div className="bg-gray-100 min-h-screen py-20">
            <div className="container mx-auto">

                
                <div className="flex justify-between items-center mb-4 px-5">
                    {/* Search bar */}
                    <input 
                        value={query}
                        onChange={(e)=>handlesearch(e)}
                        type="text"
                        placeholder="Search..."
                        className="border rounded py-2 px-3 mr-4"
                        style={{ backgroundColor: 'white', minWidth: '500px' }}
                    />
                    {/* Report */}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleGenerate}
                    >
                        Download the Report
                    </button>

                    <button
                        className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        
                    >
                        Add services
                    </button>
                </div>

                
                <div className='w-full p-4' style={{ height: '700px', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>

                    <div className="bg-white rounded-lg p-4">
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4">Customer Name</th>
                                    <th className="py-2 px-4">Customer ID</th>
                                    <th className="py-2 px-4">Contact Number</th>
                                    <th className="py-2 px-4">Service Type</th>
                                    <th className="py-2 px-4">Vehicle Model</th>
                                    <th className="py-2 px-4">Vehicle Number</th>
                                    <th className="py-2 px-4">Time Slot</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{appointment.customerName}</td>
                                    <td className="py-2 px-4">{appointment.customerId}</td>
                                    <td className="py-2 px-4">{appointment.contactNumber}</td>
                                    <td className="py-2 px-4">{appointment.serviceType}</td>
                                    <td className="py-2 px-4">{appointment.vehicleModel}</td>
                                    <td className="py-2 px-4">{appointment.vehicleNumber}</td>
                                    <td className="py-2 px-4">{appointment.timeSlot}</td>
                                    <td className="py-2 px-4">{String(appointment.completed)}</td>
                                    <td className="py-2 px-4">
                                        {/* Display buttons only if appointment is not completed */}
                                        {!appointment.completed && (
                                            <>
                                                <button className="bg-green-500 text-white py-1 px-2 rounded-md" onClick={() => handleCompleteAppointment(appointment._id)}>Complete</button>
                                                <button className="bg-red-500 text-white py-1 px-2 rounded-md" onClick={() => handleRemoveAppointment(appointment._id)}>Remove</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
