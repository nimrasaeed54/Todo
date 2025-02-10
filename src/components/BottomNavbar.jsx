import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const BottomNavbar = ({ onAddTask }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#111C2E] text-white py-3 shadow-md flex justify-around items-center">
      <button onClick={() => navigate("/home")} className="flex flex-col items-center">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button onClick={() => navigate("/add-todo")} className="flex flex-col items-center">
        <FontAwesomeIcon icon={faTasks} size="lg" />
        <span className="text-xs mt-1">Tasks</span>
      </button>
    </div>
  );
};

export default BottomNavbar;
