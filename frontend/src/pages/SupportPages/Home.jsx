import React, { useEffect, useState } from "react";
import axios from "axios";
// import Spinner from "../components/spinner";
// import { Link } from "react-router-dom";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import Feedbacktable from "../components/home/Feedbacktable";
 import FeedbackCard from "../../components/Support/FeeadBack/FeedbackCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/feedback/getFeedbacks")
      .then((response) => {
        setFeedback(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  console.log("Feedback:", feedback);

  return (
    <div
      className="p-4"
      // style={{
      //   backgroundImage: `url(${backgroundImg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   height: "full",
      // }}
    >
      {/*<div className="flex justify-center items-center gap-x-4">
         <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button> 
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>*/}

      <div className="flex items-center">
        <h1 className="text-3xl my-8 text-blue-900">Admin </h1>
        <span className="mx-2"> </span>
        <h1 className="text-3xl my-8 text-yellow-600">Dashboard</h1>
      </div>

      <div className="flex justify-center items-center gap-x-4 w-full">
        <Link to = '/faq/create'>
        <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
          FAQ List
        </button>
        </Link>
        <button className="bg-gray-300 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md border-yellow-600 border-opacity-100 border-2">
          Feedback & Reviews
        </button>
        <Link to= "/report">
        <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
          Feedback Report
        </button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1
          className="text-3xl my-8 italic"
          style={{
            background: "-webkit-linear-gradient(30deg, #020273, #d49f02)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Feedback & Reviews
        </h1>
        {/* <Link to="/feedback/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link> */}
      </div>
      {/* {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <Feedbacktable feedback={feedback} />
      ) : (
        <FeedbackCard feedback={feedback} />
      )} */}

      <FeedbackCard feedback={feedback} />
    </div>
  );
};

export default Home;
