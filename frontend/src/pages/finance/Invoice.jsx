import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { FaSearch } from 'react-icons/fa'; 
import FinancialAdmin from "./FinancialAddmin";


export default function Invoice() {
    const [items, setItems] = useState([]);
    const [filterData, setFilterData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:5173/backend/payment/getAllPayment')
        .then(result => {
          setItems(result.data);
          setFilterData(result.data);
        })
        .catch(err => console.log(err));
    }, []);
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:5173/backend/payment/deletePayment/${id}`)
      
        .then(res => {
          console.log(res);
          alert("Success");
          window.location.reload();
        })
        .catch(err => console.log(err));
    };
   
  
    function handleDownload() {
      const doc = new jspdf();
      const marginLeft = 40;
  
      doc.setDrawColor(0);
      doc.setLineWidth(2);
      doc.roundedRect(10, 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 40, 10, 10, 'D');
  
      doc.setFontSize(15);
      doc.text('Payment Report', 90, 35);
  
      const headers = [['Payment ID', 'Customer', 'Amount', 'Date']];
      const data = items.map((item) => [
        item.paymentId,
        item.customer,
        item.amount,
        new Date(item.date).toLocaleDateString(),       
      ]);
  
      doc.autoTable({
        startY: 50,
        head: headers,
        body: data,
      });
  
      doc.save('payment_report.pdf');
    }
  
    const handleSearch = (e) => {
      const getSearch = e.target.value.toLowerCase();
      if (getSearch.length > 0) {
        const searchdata = filterData.filter((item) => item.customer.toLowerCase().includes(getSearch));
        setItems(searchdata);
      } else {
        setItems(filterData);
      }
    };
    
    return (
      <div className="flex flex-col md:flex-row" style={{backgroundImage: "url(/Lambogini.jpg)", backgroundSize: 'full'}}>
        <div className="w-full md:w-1/4"><FinancialAdmin/></div>
        <div className="w-full md:w-3/4">
          <div className="text-center">
            <h1 className="text-4xl p-4">
            <span className="text-yellow-600 font-semibold">Payment</span>
            <span className="text-white font-semibold">Details</span>
          </h1>
        </div>
        <div className='flex justify-center items-center max-w-6xl mx-auto p-5'>
          <form className='bg-gray-700 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder="Search Customers..." className='bg-transparent focus:outline-none w-80 sm:w-64 font-semibold italic text-white' onChange={(e) => handleSearch(e)} />
            <FaSearch className='text-slatec-600 text-gray-400' />
          </form>    
        </div>
  
        <div className='max-h-screen p-10 flex justify-center bg-gray-0'>
          <div className='min-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
            <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
            <form className="flex flex-col gap-5 bg-gray-500 p-8 mb-4 rounded-lg w-full md:w-3/4">
                <div className='flex flex-col gap-3'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Payment ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item._id}>
                          <td>{item.paymentId}</td>
                          <td>{item.customer}</td>
                          <td>{item.amount}</td>
                          <td>{item.date}</td>
                          <td className='d-flex'>
                            <Link to={`/paymentEdit/${item._id}`} className="btn btn-warning me-2 bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-blue-300">Edit</Link>
                            <button
                              type="button"
                              className="btn btn-danger bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className='flex justify-center gap-4 my-2 text-center'>
                    <a
                      href="http://localhost:5173"
                      className='btn btn-primary bg-yellow-600 text-black font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs'
                    >
                      Back to Home
                    </a>
                    <button onClick={handleDownload} className="btn btn-primary bg-yellow-600 text-black font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs">
                      Download Report
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        </div>
        
    );
  };
  
