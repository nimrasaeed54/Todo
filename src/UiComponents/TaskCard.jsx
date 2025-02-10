import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, index }) => {
  const navigate = useNavigate();
  const { user } = useContext(TodoContext);
  const cardColors = ['bg-[#9FECFF]', 'bg-[#FFF971]', 'bg-white shadow-md'];
  const darkerTickColors = ['bg-[#80D7E7]', 'bg-[#FFE857]', 'bg-gray-200'];
  const bgColor = cardColors[index % cardColors.length];
  const tickBgColor = darkerTickColors[index % cardColors.length];
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


  return (
    <div
      onClick={() =>
        navigate(`/task/${task.id}`, {
          state: { task, bgColor },
        })
      }
      className={`flex flex-col p-4 text-gray-900 rounded-[50px] cursor-pointer transition ${bgColor}`}
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
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${tickBgColor} shadow-2xl`}>
            <FontAwesomeIcon icon={faCheck} size="lg" className="text-[#111C2E]" />
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
