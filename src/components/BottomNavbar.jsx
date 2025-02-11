
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTasks } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#111C2E] text-white py-3 shadow-md flex justify-around items-center gap-6">
      <button onClick={() => navigate("/app/home")} className="flex flex-col items-center flex-1">
        <FontAwesomeIcon icon={faHome} size="lg" />
        <span className="text-sm mt-1">Home</span>
      </button>
      <button onClick={() => navigate("/app/add-todo")} className="flex flex-col items-center flex-1">
        <FontAwesomeIcon icon={faTasks} size="lg" />
        <span className="text-sm mt-1">Tasks</span>
      </button>
    </div>
  );
};

export default BottomNavbar;
