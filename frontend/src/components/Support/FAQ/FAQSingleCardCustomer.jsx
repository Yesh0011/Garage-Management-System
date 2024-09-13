const FAQSingleCardCus = ({ faq }) => {

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

      <div className="flex justify-center items-center gap-x-2 mt-3 p-3">
        
        <p className="text-sm text-gray-500">Date Created : {formatDate(faq.createdAt)}</p>
        
      </div>
    </div>
  );
};

export default FAQSingleCardCus;
