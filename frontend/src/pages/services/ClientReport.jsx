import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Report() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    handleShowListings();
  }, []);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/backend/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const generatePDF = () => {
    const input = document.getElementById('table-container');

    // Set scale factor for better quality
    const scale = 2; // Adjust as needed

    html2canvas(input, { scale: scale })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Calculate the width and height based on the scale
        const width = canvas.width * scale / 25.4; // Convert pixels to mm
        const height = canvas.height * scale / 25.4; // Convert pixels to mm

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        pdf.save('table.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
};


  return (
    <div>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div>
          <h1 className='text-center mt-7 text-2xl font-semibold'>Report</h1>
          <div id="table-container">
            <table className="table-auto w-full border-collapse border border-gray-400 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Price</th>
                  <th className="border border-gray-400 px-4 py-2">Created Date</th>
                  <th className="border border-gray-400 px-4 py-2">Type</th>
                  <th className="border border-gray-400 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {userListings.map((listing) => (
                  <tr key={listing._id}>
                    <td className="border border-gray-400 px-4 py-2">
                      <Link
                        className='text-slate-700 font-semibold hover:underline'
                        to={`/listing/${listing._id}`}
                      >
                        {listing.name}
                      </Link>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">{listing.price}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">{listing.type}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {listing.deleted ? 'Deleted' : 'Active'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
  <button className="bg-red-700 text-white rounded-lg px-6 py-3 mt-5 hover:bg-opacity-90 focus:outline-none" onClick={generatePDF}>Generate PDF</button>
</div>
        </div>
      )}
    </div>
  );
}
