import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "jspdf-autotable";
import jsPDF from "jspdf";

const Report = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/feedback/getFeedbacks") // Fetch feedback data
      .then((response) => {
        setFeedback(response.data.data); // Update feedback state
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Pdf download
  const handleDownload = () => {
    const doc = new jsPDF();
        const headers = [["Index", "Email", "Feedback", "Rating", "Status"]];

        const data = feedback.map((item, index) => [
            index + 1,
            item.Email,
            item.Description,
            item.Rating,
            item.Rating >= 3 && "Positive" || item.Rating < 3 && "Negative" 
        ]);

        const styles = {
          halign: "left",
          valign: "middle",
          fontSize: 11,
          cellPadding: 4,
      };

      doc.autoTable({
          head: headers,
          body: data,
          styles
      });

      // Save the PDF with the filename
      doc.save("Feedback.pdf");
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        <h1 className="text-3xl my-8 text-blue-900">Admin </h1>
        <span className="mx-2"> </span>
        <h1 className="text-3xl my-8 text-yellow-600">Dashboard</h1>
      </div>

      <div className="flex justify-center items-center gap-x-4 w-full">
        <Link to="/faq/create">
          <button className="bg-gray-300 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
            FAQ List
          </button>
        </Link>
        <Link to="/adminFeeds">
          <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md">
            Feedback & Reviews
          </button>
        </Link>
        <button className="bg-gray-300 hover:bg-gray-400 text-yellow-600 px-4 py-1 rounded-lg w-72 h-15 font-bold text-lg shadow-md  border-yellow-600 border-opacity-100 border-2">
          Feedback Report
        </button>
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
          Feedback report
        </h1>
        <button className="bg-gray-300 text-blue-800 px-4 py-1 rounded-lg w-50 h-15 font-bold text-lg shadow-md" onClick={handleDownload}>
          Download PDF
        </button>
      </div>

      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">Index</th>
            <th className="border border-slate-600 rounded-md">Email</th>
            <th className="border border-slate-600 rounded-md">Feedback</th>
            <th className="border border-slate-600 rounded-md">Rating</th>
            <th className="border border-slate-600 rounded-md">Status</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((feedbackItems, index) => (
            <tr key={feedbackItems._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {feedbackItems.Email}
              </td>
              <td className="border border-slate-700 rounded-md text-wrap mr-9  ">&nbsp;
                {feedbackItems.Description}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {feedbackItems.Rating}
              </td>
              {feedbackItems.Rating >= 3 && (
                <td className="border border-slate-700 rounded-md text-center">
                  Positive
                </td>
              )}
              {feedbackItems.Rating < 3 && (
                <td className="border border-slate-700 rounded-md text-center">
                  Negative
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
