import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import DeleteFAQModal from "./DeleteFAQModal";
import EditFAQModal from "./EditFAQModal";

const FAQSingleCard = ({ faq }) => {
  const [DelFaqModal, setDelFaqModal] = useState(false);
  const [EditFaqModal, setEditFaqModal] = useState(false);

  // Function to format date in a human-readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust date formatting as needed
  };

  return (
    <div
      key={faq.Question}
      className="border-4 border-gray-400 rounded-lg px-4 py-2 m-4 relative bg-gradient-to-r from-white to-gray-300 transition duration-300 ease-in-out hover:border-gray-600"
    >
      <div className="flex justify-start items-center gap-x-2 text-sm">
        <h1 className="text-green-600 text-xl">Q.</h1>
        <h2 className="my-1 ">{faq.Question}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2 text-sm">
        <h1 className="text-green-600 text-xl">A.</h1>
        <h2 className="my-1 text-blue-900">{faq.Answer}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-3 p-3">
        <AiOutlineEdit
          className="text-2xl text-yellow-700 hover:text-black"
          onClick={() => setEditFaqModal(true)}
        />
        <p className="text-sm text-gray-500">Date Created : {formatDate(faq.createdAt)}</p>
        <MdOutlineDelete
          className="text-2xl text-red-700 hover:text-black"
          onClick={() => setDelFaqModal(true)}
        />
      </div>
      {DelFaqModal && (
        <DeleteFAQModal
          faq={faq}
          onClose={() => setDelFaqModal(false)}
        />
      )}
      {EditFaqModal && (
        <EditFAQModal
          faq={faq}
          onClose={() => setEditFaqModal(false)}
        />
      )}
    </div>
  );
};

export default FAQSingleCard;
