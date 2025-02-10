import React from 'react';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`bg-[#7B8DEC] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#5f73cc] transition-all ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
