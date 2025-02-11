import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, index }) => {
  const navigate = useNavigate();
  const { user, deleteTask } = useContext(TodoContext);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const cardColors = ['bg-[#9FECFF]', 'bg-[#FFF971]', 'bg-[#FFFFFF]'];
  const lighterBgColors = ['bg-[#80D7E7]', 'bg-[#FFE857]', 'bg-gray-200'];
  const bgColor = cardColors[index % cardColors.length];
  const btnBgColor = lighterBgColors[index % lighterBgColors.length];

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (e) => {
    e.stopPropagation(); 
    setShowMenu(false);

    navigate('/app/add-todo', { state: { task, bgColor } });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    setShowMenu(false);

    deleteTask(task.id);
  };

  return (
    <div
      onClick={() =>
        navigate(`/task/${task.id}`, {
          state: { task, bgColor },
        })
      }
      className={`relative flex flex-col p-4 text-gray-900 rounded-[50px] cursor-pointer transition ${bgColor}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <img
            src={user?.imgLink}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center gap-2">
          {task.deadline && (
            <p className="text-sm font-semibold text-gray-700">
              {getTimeLeft(task.deadline)}
            </p>
          )}
          <div ref={menuRef} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${btnBgColor} shadow-2xl`}
            >
              <FontAwesomeIcon icon={faEllipsisV} size="lg" className="text-[#111C2E]" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded z-10">
                <button
                  onClick={handleEdit}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm font-semibold text-gray-500">{user?.email}</p>
      </div>
      <div className="mt-1">
        <h2 className="text-lg font-bold">{task.name}</h2>
      </div>
    </div>
  );
};

export default TaskCard;
