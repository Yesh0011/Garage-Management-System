import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ShowService() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [listingToDelete, setListingToDelete] = useState(null); // State to store the listing ID to delete
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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

  const handleListingDelete = async () => {
    try {
      const res = await fetch(`/backend/listing/delete/${listingToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingToDelete)
      );
      setListingToDelete(null); // Clear the listing to delete
      setShowConfirmationModal(false); // Close the confirmation modal after deletion
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Services</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.type}</p>
              </Link>

              <div className='flex flex-col item-center '>
                <button onClick={() => {
                  setListingToDelete(listing._id);
                  setShowConfirmationModal(true);
                }} className='bg-red-700 rounded-lg px-3 py-1 text-white uppercase font-semibold mt-2'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='bg-green-700 rounded-lg px-3 py-1 text-white uppercase font-semibold mt-2'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this listing?
            </p>
            <div className="flex justify-between">
              <button onClick={handleListingDelete} className="bg-red-700 text-white px-4 py-2 rounded-lg mr-4">
                Yes
              </button>
              <button onClick={() => setShowConfirmationModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}