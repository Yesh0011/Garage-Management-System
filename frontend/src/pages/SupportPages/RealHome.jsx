import React from "react";
import { Link } from "react-router-dom";

export default function RealHome() {
  return (
    <div>
        <h1>Customer's Home Page</h1>
      <Link to="/faqs">
        <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
          FAQs
        </button>
      </Link>
      <Link to="/feedback/create">
        <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
          Feedbacks
        </button>
      </Link>
    </div>
  );
}
