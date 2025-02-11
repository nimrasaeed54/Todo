import React from 'react';

const InputField = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="w-full p-3 mt-2 bg-slate-50 text-gray-800 rounded-md shadow-md"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
