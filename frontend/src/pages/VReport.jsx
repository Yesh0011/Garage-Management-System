import React, { useEffect, useState, useRef } from 'react';
import Repairdashboard from '../components/Repairdashboard';
import axios from 'axios';
import jsPdf from 'jspdf';
import 'jspdf-autotable';
import logo from '../Image/logo.png';
import { FaDownload } from 'react-icons/fa';




export default function VReport() {
    const [formData, setFormData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [query, setQuery] = useState('');
    const tableRef = useRef(null);

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

    const handleSearch = (e) => {
        const getSearch = e.target.value;

        if (getSearch.length > 0) {
            const searchdata = formData.filter((item) => item.vehiclenumber.toLowerCase().includes(getSearch));
            setFormData(searchdata);
        } else {
            setFormData(filterData);
        }

        setQuery(getSearch);
    };

    function handleDownload() {
        const doc = new jsPdf();
        const marginLeft = 40;

        doc.setDrawColor(0);
        doc.setLineWidth(2);
        doc.roundedRect(10, 20, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 40, 10, 10, 'D');

        doc.setFontSize(15);
        doc.text('Repair Report', 90, 35);

        const headers = [['Email', 'Vehicle Number', 'Date', 'Status']];
        const data = formData.map((item) => [
            item.email,
            item.vehiclenumber,
            new Date(item.date).toLocaleDateString(),
            item.details,
        ]);

        const columnStyles = {
          0: { columnWidth: 55 }, 
          1: { columnWidth: 40 }, 
          2: { columnWidth: 40 }, 
          3: { columnWidth: 45 }, 
      };
     
      const end =
      "<<< This is auto generated report. All rights E.G Motors >>>";

        doc.autoTable({
            startY: 50,
            head: headers,
            body: data,
            columnStyles: columnStyles, 

        });

       
        doc.addImage(logo, 'PNG', 85, 180, 50, 50);
        doc.text(end,marginLeft, 270)

        doc.save('Repair Status.pdf');
    }

    return (
        <div className="flex">
            <div style={{ width: '250px', height: '487px', background: 'black', padding: '0px' }}>
                <Repairdashboard />
            </div>

            <div className="w-3/4 p-10">
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="my-4"
                        value={query}
                        onChange={(e) => handleSearch(e)}
                        style={{ padding: '5px', border: '1px solid #ccc' }}
                    />
                </div>
                <table className="w-full border-collapse border" ref={tableRef} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Vehicle Number</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((status) => (
                            <tr key={status._id}>
                                <td className="border border-gray-300 px-4 py-2">{status.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{status.vehiclenumber}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(status.date).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{status.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleDownload} style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', textAlign: 'center', textDecoration: 'none', display: 'inline-block', fontSize: '16px', borderRadius: '8px' }}>
                    Report <FaDownload />
                </button>
            </div>
        </div>
    );
}
