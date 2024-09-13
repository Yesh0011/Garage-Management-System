import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import toast from "react-hot-toast";

const DeleteFeedbackModal = ({ feedback, onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFeedback = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/feedback/deleteFeedback/${feedback._id}`)
      .then((error) => {
        setLoading(false);
        enqueueSnackbar('Feedback Deleted Successfully', { variant: 'success'});
        toast.success("Deleted Successfully")
        setTimeout(() => {
          window.location.reload()
        }, 1000);  
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
          <div className="flex flex-col items-center rounded-xl w-[300px] p-8 mx-auto">
            <h3 className="text-xl justify-normal">
              Are You Sure You want to delete this feedback?
            </h3>

            <button
              className="text-m p-4 bg-red-600 text-white rounded-xl m-8 w-full"
              onClick={handleDeleteFeedback}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeedbackModal;
