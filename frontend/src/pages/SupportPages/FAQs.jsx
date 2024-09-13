import React, { useEffect, useState } from "react";
import axios from "axios";
import FAQcardCus from "../../components/Support/FAQ/FAQCardCustomer";
import BackButton from "../../components/Support/BackButton";

const FAQs = () => {
  const [faq, setFAQ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

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

  const filteredFAQ = faq.filter((item) =>
    item.Question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">

      <BackButton/>

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

      {filteredFAQ.length === 0 && (
        <p className="text-red-500 mt-4">No Results Found</p>
      )}

      <FAQcardCus faq={filteredFAQ} />
      
    </div>
  );
};

export default FAQs;
