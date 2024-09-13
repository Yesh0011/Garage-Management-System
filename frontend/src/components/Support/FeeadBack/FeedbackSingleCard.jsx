// import { Link } from "react-router-dom";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
// import FeedbackModal from "./FeedbackModal";
import DeleteFeedbackModal from "./DeleteFeedbackModal";
import InfoFeedbackModal from "./InfoFeedbackModal";
import EditFeedbackModal from "./EditFeedbackModal";

const FeedbackSingleCard = ({ feedback }) => {
  // const [showModal, setShowModal] = useState(false);
  const [DelFbModal, setDelFbModal] = useState(false);
  const [InfoFbModal, setInfoFbModal] = useState(false);
  const [EditFbModal, setEditFbModal] = useState(false);

  // Function to truncate description text to a fixed length
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    } else {
      return description;
    }
  };

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

  return (
    <div
      key={feedback.Email}
      className="border-4 border-gray-400 rounded-lg px-4 py-2 m-4 relative bg-gradient-to-r from-white to-gray-300 transition duration-300 ease-in-out hover:border-gray-600"
    >
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-blue-700 text-2xl" />
        <h2 className="my-2 text-gray-500">{feedback.Email}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2 text-sm">
        <h2 className="my-1">
          {truncateDescription(feedback.Description, 70)}
        </h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <h2 className="my-2 text-gray-500">{renderStars(feedback.Rating)}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        {/* <BiShow
          className="text-3xl text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        /> */}
        <BsInfoCircle
          className="text-2xl text-green-700 hover:text-black"
          onClick={() => setInfoFbModal(true)}
        />

        <AiOutlineEdit
          className="text-2xl text-yellow-700 hover:text-black"
          onClick={() => setEditFbModal(true)}
        />

        <MdOutlineDelete
          className="text-2xl text-red-700 hover:text-black"
          onClick={() => setDelFbModal(true)}
        />
      </div>
      {DelFbModal && (
        <DeleteFeedbackModal
          feedback={feedback}
          onClose={() => setDelFbModal(false)}
        />
      )}
      {InfoFbModal && (
        <InfoFeedbackModal
          feedback={feedback}
          onClose={() => setInfoFbModal(false)}
        />
      )}
      {EditFbModal && (
        <EditFeedbackModal
          feedback={feedback}
          onClose={() => setEditFbModal(false)}
        />
      )}
    </div>
  );
};

export default FeedbackSingleCard;
