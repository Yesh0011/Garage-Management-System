import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AiOutlineClose } from "react-icons/ai";
import toast from 'react-hot-toast'

const EditFAQModal = ({ faq, onClose }) => {
const [Question, setQuestion] = useState('');
const [Answer, setAnswer] = useState('');
const [loading, setLoading] = useState(false);
const {id} = useParams();
const { enqueueSnackbar } = useSnackbar();



useEffect(() => {
  setLoading(true);
  axios.get(`http://localhost:3000/faq/getFaq/${faq._id}`)
  .then((response) => {
    setQuestion(response.data.Question);
    setAnswer(response.data.Answer);
    setLoading(false);
  }).catch((error) => {
    setLoading(false);
    alert('An error happened. Please check console');
    console.log(error);
  });
}, [])

const handleEditFAQ = () => {
  const data = {
    Question,
    Answer,
  };
  setLoading(true);
  axios
    .put(`http://localhost:3000/faq/editFaq/${faq._id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('FAQ Edited Successfully', { variant: 'info'});
      toast.success('Successfully Updated!');
      setTimeout(() => {
        window.location.reload()
      }, 600);  
      onClose();
    })
    .catch((error) => {
      setLoading(false);
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
        <h1 className='text-3xl my-4 italic'>Edit FAQ</h1>
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
    <div className='flex flex-col'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Question</label>
          <input 
            type='text'
            value={Question}
            onChange={(e) => setQuestion(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Answer</label>
          <input 
            type='text'
            value={Answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='text-m p-2 bg-yellow-600 rounded-xl m-8 ' onClick={handleEditFAQ}>
          Save
        </button>
      </div>
    </div>
    </div>
    
  )
}

export default EditFAQModal