import React, { useState } from 'react'
import BackButton from '../../components/Support/BackButton';
import Spinner from '../../components/Support/spinner';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteFeedback = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteFeedback = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/feedback/deleteFeedback/${feedback.id}`)
      .then((error) => {
        setLoading(false);
        enqueueSnackbar('Feedback Deleted Successfully', { variant: 'success'});
        navigate('/');
      }).catch((error) => {
        setLoading(false);
        //alert(`An error happened. Please Check Console.`);
        enqueueSnackbar('Error', { variant: 'error'});
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Feedback</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this feedback?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteFeedback}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteFeedback