import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AcceptOrderForm() {
    const [formData, setFormData] = useState({
        supplierName: '',
        phoneNumber: '',
        email: '',
        deliverdate: '',
        price: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orderName = searchParams.get('orderName');
    const quantity = searchParams.get('quantity');

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            // Add orderName and quantity to the form data
            const postData = {
                ...formData,
                orderName: orderName,
                quantity: quantity,
            };

            const res = await fetch('/backend/supplierorder/addordersupplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData), // Send postData to the backend
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            } else {
                navigate(`/suplierorder`);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Order Form</h1>
            <form className='flex flex-col sm:flex-row gap-4 bg-black bg-opacity-80 p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Order Name'
                        className='border p-3 rounded-lg'
                        id='orderName'
                        name='orderName'
                        value={orderName}
                        readOnly
                    />
                    <input
                        type='text'
                        placeholder='Quantity'
                        className='border p-3 rounded-lg'
                        id='quantity'
                        name='quantity'
                        value={quantity}
                        readOnly
                    />
                    <input
                        type='text'
                        placeholder='Supplier Name'
                        className='border p-3 rounded-lg'
                        id='supplierName'
                        name='supplierName'
                        required
                        onChange={handleChanges}
                        value={formData.supplierName}
                    />
                    <input
                        type='text'
                        placeholder='Phone Number'
                        className='border p-3 rounded-lg'
                        id='phoneNumber'
                        name='phoneNumber'
                        required
                        onChange={handleChanges}
                        value={formData.phoneNumber}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='border p-3 rounded-lg'
                        id='email'
                        name='email'
                        required
                        onChange={handleChanges}
                        value={formData.email}
                    />
                    <div className='flex gap-4 items-center'>
                        <span className='text-white'>Deliver By:</span><br/>
                        <input
                            type='date'
                            className='border p-3 rounded-lg w-4/5 ml-14'
                            id='deliverdate'
                            name='deliverdate'
                            required
                            onChange={handleChanges}
                            value={formData.deliverdate}
                        />
                    </div>
                    <input
                        type='text'
                        placeholder='Price'
                        className='border p-3 rounded-lg'
                        id='price'
                        name='price'
                        required
                        onChange={handleChanges}
                        value={formData.price}
                    />
                    <button
                        type='submit'
                        className='p-3 bg-yellow-600 text-white rounded-lg hover:opacity-95 disabled:opacity-70'
                    >
                        {loading ? 'Accepting...' : 'Accept Order'}
                    </button>
                    {error && <p className='text-red-800 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    );
}
