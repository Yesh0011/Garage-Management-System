import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Toacceptorder() {
    const [orderdata, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/backend/order/get/${params.orderid}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    setError(true);
                    setLoading(false);
                } else {
                    setOrderData(data);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [params.orderid]);


    

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="absolute top-0 left-0 w-full h-80 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('https://www.gosiger.com/hs-fs/hubfs/parts_pgbanner.jpg?width=1000&name=parts_pgbanner.jpg')` }}></div>
            <div className="relative details-container" style={{ marginTop: '12rem', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.20)' }}>
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-600">Error fetching data.</p>
                ) : orderdata ? (
                    <div>
                        <h2 className="text-5xl font-semibold mb-4 text-white">Details of Order</h2><br/><br/>
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <p className='font-semibold text-gray-800'>Order Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp; {orderdata.ordername}</p>
                            <p className='font-semibold text-gray-800'>Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :&nbsp;&nbsp; {orderdata.description}</p>
                            <p className='font-semibold text-gray-800'>Brand &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;   {orderdata.brand}</p>
                            <p className='font-semibold text-gray-800'>Model &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp; {orderdata.model}</p>
                            <p className='font-semibold text-gray-800'>Quantity &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;  {orderdata.quantity}</p>
                            <p className='font-semibold text-gray-800'>Deadline   &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; :&nbsp;&nbsp;  {orderdata.deadline}</p><br/><br/><br/>

                            <div className="flex justify-center mt-4">
                            <Link
                             to={{
                                pathname: "/acceptform",
                                search: `?orderName=${orderdata.ordername}&quantity=${orderdata.quantity}`,
                            }}
                            className="bg-black hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Accept Order
                        </Link>
                                                    </div>

                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No data available.</p>
                )}

            </div>
        </div>
    );
}
