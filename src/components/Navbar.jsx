import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskButton from "../UiComponents/AddTaskButton";
import { TodoContext } from "../context/TodoContext";

const Navbar = ({ onAddTask }) => {
  const navigate = useNavigate();
  const { user } = useContext(TodoContext); 

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-[#111C2E] text-white w-full max-w-md mx-auto">
      
      <div className="relative w-10 h-10">
        <img 
          src={user?.imgLink} 
          alt="Profile"
          className="w-full h-full rounded-full border-2 border-white" 
        />
      </div>
      
      <div className="flex items-center gap-3">
        
        <div className="relative w-10 h-10 flex items-center justify-center bg-[#1E2A47] rounded-full cursor-pointer">
          <FontAwesomeIcon icon={faBell} className="text-white text-base" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#7B8DEC] rounded-full"></span>
        </div>
        
        <AddTaskButton 
          navbar={true}
          onClick={() => navigate("/add-todo")}
          className="w-10 h-10 flex items-center justify-center bg-[#1E2A47] text-white rounded-full cursor-pointer hover:bg-[#16334a] transition"
          text={<FontAwesomeIcon icon={faPlus} className="text-base" />}
        />
      </div>
    </nav>
  );
};

export default Navbar;