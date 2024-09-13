import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PaymentEdit() {
    const { id } = useParams();
    const [paymentId, setPaymentID] = useState('');
    const [customer, setCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5173/backend/payment/onePayment/${id}`)
            .then(result => {
                console.log(result);
                const { paymentId, customer, amount, date } = result.data;
                setPaymentID(paymentId);
                setCustomer(customer);
                setAmount(amount);
                setDate(date);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = { paymentId, customer, amount, date };

        axios.put(`http://localhost:5173/backend/payment/updatePayment/${id}`, formData)
            .then(result => {
                console.log(result);
                navigate('/invoice'); // Redirect to the "invoice" page
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="bg-cover bg-no-repeat bg-center w-full h-full" style={{backgroundImage: "url(/Lambogini.jpg)"}}>
            <div className='max-h-screen flex items-center justify-center bg-gray-0'>
                <div className='min-w-full p-10 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
                    <div className="text-center">
                        <h1 className="text-4xl p-4">
                            <span className="text-yellow-600 font-semibold">Payment</span>
                            <span className="text-white font-semibold">Edit</span>
                        </h1>
                    </div>
                    <div className='flex flex-col md:flex-row gap-5 items-start justify-center'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-500 p-8 mb-4 rounded-lg w-full md:w-1/2'>
                            <div className='flex flex-col gap-3'>
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor='paymentId' className='form-control'>Payment ID:</label>
                                    <input type='text' placeholder='Enter Payment ID' className='border p-2 rounded-lg bg-gray-400 font-semibold' id='paymentId' name='paymentId' 
                                        value={paymentId}
                                        onChange={(e) => setPaymentID(e.target.value)}
                                    />
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor='customer' className='form-control'>Customer:</label>
                                    <input type='text' placeholder='Enter Customer Name' className='border p-2 rounded-lg bg-gray-400 font-semibold' id='customer' name='customer' 
                                        onChange={(e) => setCustomer(e.target.value)}
                                        value={customer}
                                    />
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor='amount' className='form-control'>Amount:</label>
                                    <input type='text' placeholder='Enter Amount' className='border p-2 rounded-lg bg-gray-400 font-semibold' id='amount' name='amount' 
                                        onChange={(e) => setAmount(e.target.value)}
                                        value={amount}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center gap-4 my-2'>
                                <button
                                    type="submit"
                                    className="btn btn-primary bg-yellow-600 text-black font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs"
                                >
                                    Save Changes
                                </button>
                                <Link
                                    to="/invoice" // Redirect to the "invoice" page
                                    className="btn btn-outline-primary bg-yellow-600 text-bblack font-semibold py-1 px-3 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-blue-300 w-full max-w-xs text-center"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
