import React, { useEffect, useState } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import axios from 'axios';

export default function HaryUP() {
    const [formData, setFormData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/backend/statushistory/getAllhistory');
                setFormData(res.data);
                setFilterData(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    const countEmailOccurrences = () => {
        const emailCount = {};
        formData.forEach((status) => {
            const email = status.email;
            emailCount[email] = (emailCount[email] || 0) + 1;
        });
        return emailCount;
    };

    const renderTableRows = () => {
        const emailCount = countEmailOccurrences();
        return Object.entries(emailCount).map(([email, count]) => (
            count >= 5 ? (
                <tr key={email} style={{ color: count > 5 ? 'red' : 'inherit' }}>
                    <td className="border border-gray-300 px-4 py-2">{email}</td>
                    <td className="border border-gray-300 px-4 py-2" hidden>{count}</td>
                    <td className="border border-gray-300 px-4 py-2">{getVehicleNumber(email)}</td>
                </tr>
            ) : null
        ));
    };

    const getVehicleNumber = (email) => {
        const status = formData.find((item) => item.email === email);
        return status ? status.vehiclenumber : '';
    };

    return (
        <div className="flex">
            <div style={{ width: '250px', height: '487px', background: 'black', padding: '0px' }}>
                <Repairdashboard />
            </div>

            <div className="w-3/4 p-10">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2" hidden>Count</th>
                            <th className="border border-gray-300 px-4 py-2">Vehicle Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
