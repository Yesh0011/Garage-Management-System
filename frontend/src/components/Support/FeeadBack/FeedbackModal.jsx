import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const FeedbackModal = ({ feedback, onClose }) => {

  const { Email, Description, createdAt } = feedback;
// Function to format date in a human-readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust date formatting as needed
};

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[400px] max-w-full h-[300px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-blue-400 text-3xl" />
          <h2 className="my-1">{feedback.Email}</h2>
        </div>
        <div 
          className="flex justify-start items-center gap-x-2"
          style={{ marginTop: '30px' }}
        >
          <h2 className="my-1">{feedback.Description}</h2>
        </div>
        <div className="text-gray-400 flex justify-start items-center gap-x-2" style={{ marginTop: '30px' }}>
          <p>Date Created : {formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
