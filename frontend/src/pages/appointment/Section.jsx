import React from 'react';

const Section = ({ heading, text, Button, imageUrl, onClick }) => {
  return (
    <section className="px-20 pt-20">
      <div>
        <img src={imageUrl} className="rounded-lg float-left w-1/3 h-70" style={{ border: '2px solid yellow', borderRadius: '10px', marginBottom: '10px' }} />
        <h2 className="text-3xl text-white font-bold mb-2 flex justify-end">{heading}</h2>
        <p className="text-white flex justify-end">{text}</p>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded" onClick={onClick}>{Button}</button>
        </div>
      </div>
    </section>
  );
};

export default Section;