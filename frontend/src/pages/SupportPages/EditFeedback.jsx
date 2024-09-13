import React, { useState, useEffect } from 'react'
import BackButton from '../../components/Support/BackButton';
import Spinner from '../../components/Support/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditFeedback = () => {
const [Email, setEmail] = useState('');
const [Description, setDescription] = useState('');
const [Rating, setRating] = useState();
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const {id} = useParams();
const { enqueueSnackbar } = useSnackbar();

  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Render filled star
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        // Render empty star
        stars.push(
          <span key={i} className="text-gray-400">
            ★
          </span>
        );
      }
    }
    return stars;
  };

useEffect(() => {
  setLoading(true);
  axios.get(`http://localhost:3000/feedback/getFeedback/${id}`)
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
    .put(`http://localhost:3000/feedback/editFeedback/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Feedback Edited Successfully', { variant: 'info'});
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      //alert('An error happened. Please Check Console');
      enqueueSnackbar('Error', { variant: 'error'});
      console.log(error);
    });
};

  return (
    <div
      className="p-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "full",
      }}
    >
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Feedback</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input 
            type='text'
            value={Email}
            onChange={(e) => setFid(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input 
            type='text'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Rating</label>
          <input 
            type='text'
            value={Rating}
            onChange={(e) => setRating(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-yellow-600 m-8' onClick={handleEditFeedback}>
          Save
        </button>
      </div>
    </div>
    </div>
  )
}

export default EditFeedback