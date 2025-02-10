import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTaskButton = ({ onClick, type = "button", text, className = "", navbar = false }) => {
  const defaultClasses = navbar
    ? ""
    : "fixed bottom-20 z-50 left-1/2 transform -translate-x-1/2 bg-[#7B8DEC] text-white w-16 h-16 rounded-full shadow-lg transition hover:bg-[#5f73cc] flex items-center justify-center";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultClasses} ${className}`}
    >
      {text ? text : <FontAwesomeIcon icon={faPlus} size="lg" />}
    </button>
  );
};

export default AddTaskButton;
