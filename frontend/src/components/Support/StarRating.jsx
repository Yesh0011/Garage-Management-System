import { useState } from "react";

const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (index) => {
    onChange(index + 1);
  };

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={(hoverValue || value) > index ? "text-yellow-400 cursor-pointer text-5xl" : "text-gray-300 cursor-pointer text-5xl"}
            onMouseEnter={() => setHoverValue(index + 1)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => handleClick(index)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
