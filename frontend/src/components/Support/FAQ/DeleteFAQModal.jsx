import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from 'react'
// import Spinner from '../components/spinner';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import toast from "react-hot-toast";

const DeleteFAQModal = ({ faq, onClose }) => {
//   const { Email, Description, createdAt } = feedback;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Function to format date in a human-readable format
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(); // Adjust date formatting as needed
//   };

  const handleDeleteFAQ = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/faq/deleteFaq/${faq._id}`)
      .then((error) => {
        setLoading(false);
        enqueueSnackbar('FAQ Deleted Successfully', { variant: 'success'});
        setTimeout(() => {
          window.location.reload()
        }, 800);   
        toast.success("FAQ Deleted")
        onClose(); // Close the modal after successful deletion
      }).catch((error) => {
        setLoading(false);
        //alert(`An error happened. Please Check Console.`);
        enqueueSnackbar('Error', { variant: 'error'});
        toast.error("Error")
        console.log(error);
      });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[400px] max-w-full h-[300px] border-4 border-black bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-lg text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <div className="p-4">
          {/* <h1 className="text-3xl my-4">Delete Feedback</h1> */}
          {/* {loading ? <Spinner /> : ""} */}
          <div className="flex flex-col items-center rounded-xl w-[300px] p-8 mx-auto">
            <h3 className="text-xl justify-normal">
              Are You Sure You want to delete this FAQ?
            </h3>

            <button
              className="text-m p-4 bg-red-600 text-white rounded-xl m-8 w-full"
              onClick={handleDeleteFAQ}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFAQModal;
