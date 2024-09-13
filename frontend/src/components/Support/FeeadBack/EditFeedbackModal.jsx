import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import StarRating from '../StarRating';
import { AiOutlineClose } from "react-icons/ai";
import toast from 'react-hot-toast'

const EditFeedbackModal = ({ feedback, onClose }) => {
const [Email, setEmail] = useState('');
const [Description, setDescription] = useState('');
const [Rating, setRating] = useState();
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const {id} = useParams();
const { enqueueSnackbar } = useSnackbar();

  // Function to render star icons based on rating
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         // Render filled star
//         stars.push(
//           <span key={i} className="text-yellow-500">
//             ★
//           </span>
//         );
//       } else {
//         // Render empty star
//         stars.push(
//           <span key={i} className="text-gray-400">
//             ★
//           </span>
//         );
//       }
//     }
//     return stars;
//   };

useEffect(() => {
  setLoading(true);
  axios.get(`http://localhost:3000/feedback/getFeedback/${feedback._id}`)
  .then((response) => {
    setEmail(response.data.Email);
    setDescription(response.data.Description);
    setRating(response.data.Rating);
    setLoading(false);
  }).catch((error) => {
    setLoading(false);
    alert('An error happened. Please check console');
    console.log(error);
  });
}, [])

const handleEditFeedback = () => {
  const data = {
    Email,
    Description,
    Rating,
  };
  setLoading(true);
  axios
    .put(`http://localhost:3000/feedback/editFeedback/${feedback._id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Feedback Edited Successfully', { variant: 'info'});
      onClose();
      toast.success("Updated Successfully")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
    })
    .catch((error) => {
      setLoading(false);
      //alert('An error happened. Please Check Console');
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
        className="w-[400px] border-4 border-blue-900 max-w-full h-[400px] bg-gradient-to-r from-white to-gray-300 rounded-xl p-4 flex flex-col relative"
      >
        <h1 className='text-3xl my-4 italic'>Edit Feedback</h1>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
    <div className='flex flex-col'>
        
        <div className='my-4'>
          <label className="text-lg mr-4 text-gray-500">Rate your experience..</label>
              <StarRating value={Rating} onChange={setRating} />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Leave Feedback here</label>
          <input 
            type='text'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='text-m p-2 bg-yellow-600 rounded-xl m-8 ' onClick={handleEditFeedback}>
          Save
        </button>
      </div>
    </div>
    </div>
    
  )
}

export default EditFeedbackModal