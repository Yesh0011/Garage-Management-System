import React, { useEffect, useState } from "react";
import axios from "axios";
import FAQcard from "../../components/Support/FAQ/FAQCard";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import toast from "react-hot-toast";

const CreateFAQ = () => {
  const [faq, setFAQ] = useState([]);
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/faq/getFaqs")
      .then((response) => {
        setFAQ(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSaveFAQ = () => {
    const data = {
      Question,
      Answer,
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/faq/addFaq", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("FAQ created successfully", {
          variant: "success",
        });
        toast.success("Created Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error " });
        toast.error("Error");
        console.log(error);
      });
  };

  const filteredFAQ = faq.filter((item) =>
    item.Question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center">
        <h1 className="text-3xl my-8 text-blue-900">Admin </h1>
        <span className="mx-2"> </span>
        <h1 className="text-3xl my-8 text-yellow-600">Dashboard</h1>
      </div>

      <div className="flex justify-center items-center gap-x-4 w-full">
        <button className="bg-gray-300 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md border-yellow-600 border-opacity-100 border-2">
          FAQ List
        </button>
        <Link to="/adminFeeds">
          <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
            Feedback & Reviews
          </button>
        </Link>
        <Link to="/report">
          <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
            Feedback Report
          </button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h1
          className="text-3xl my-8 italic mt-15"
          style={{
            background: "-webkit-linear-gradient(30deg, #020273, #d49f02)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Frequently Asked Questions
        </h1>

        {/* Search bar */}
        <div className=" flex my-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="border-2 border-gray-600 px-4 py-2 w-full rounded mr-12 mt-15"
          />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="col-span-1">
          {filteredFAQ.length === 0 && (
            <p className="text-red-500 mt-4">No Results Found</p>
          )}
          <FAQcard faq={filteredFAQ} />
        </div>

        <div className="col-span-1">
          <div
            className="flex flex-col border-2 border-gray-600 rounded-xl w-[400px] p-4 mx-auto"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              position: "relative",
            }}
          >
            <h1
              style={{
                textAlign: "right",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#FFD700",
                fontSize: "2rem",
              }}
            >
              Add New FAQ
            </h1>

            <div className="my-4">
              <label className="text-m mr-4 text-black">Question</label>
              <input
                type="text"
                value={Question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded"
              />
            </div>
            <div className="my-4">
              <label className="text-m mr-4 text-black">Answer</label>
              <input
                type="text"
                value={Answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full rounded"
              />
            </div>

            <button
              className="p-2 bg-yellow-500 m-4 rounded-xl relative bottom-1 right-1"
              style={{ width: "120px", height: "40px" }}
              onClick={handleSaveFAQ}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFAQ;
