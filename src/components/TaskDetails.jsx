
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/TodoContext';
import SwipeToComplete from '../UiComponents/SwipeToComplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TaskDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { tasks, user, toggleTaskDone } = useContext(TodoContext);

  const [currentTask, setCurrentTask] = useState(null);
  const [bgColor, setBgColor] = useState('bg-white');

  useEffect(() => {
    const foundTask = tasks.find(task => String(task.id) === id);
    setCurrentTask(foundTask);

    if (location.state?.bgColor) {
      setBgColor(location.state.bgColor);
    } else if (foundTask) {
      const index = tasks.findIndex(task => String(task.id) === id);
      const cardColors = ['bg-[#FFF971]', 'bg-[#9FECFF]', 'bg-white'];
      setBgColor(cardColors[index % cardColors.length]);
    }
  }, [tasks, id, location.state]);

  if (!currentTask) {
    return <div className="min-h-screen p-8">Task not found</div>;
  }

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    if (days > 0) return `${days}d ${hours}h ${minutes}m left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className={`min-h-screen p-5 ${bgColor} flex flex-col max-w-md mx-auto`}>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-[#111C2E] text-white rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-7xl text-[#111C2E]">{currentTask.name}</h2>
      </div>

      {currentTask.deadline && (
        <div className="mb-6">
          <div className="flex justify-between">
            <h3 className="text-sm font-bold text-gray-400">Time Left</h3>
            <h3 className="text-sm font-bold text-gray-400">Assignee</h3>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-4xl text-[#111C2E]">
                {getTimeLeft(currentTask.deadline)}
              </p>
              <p className="text-sm">
                {new Date(currentTask.deadline).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <img
                src={user?.imgLink}
                alt="Assignee"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-500">Additional Description</h3>
        <p className="text-xl text-[#111C2E]">{currentTask.description}</p>
      </div>

      <div className="mb-6 flex flex-col items-start">
        <h3 className="text-sm font-bold text-gray-500">Created</h3>
        <div className="flex items-center gap-2">
          <p className="text-xl text-[#111C2E]">by {user?.email}</p>
          <img
            src={user?.imgLink}
            alt="Creator"
            className="w-6 h-6 rounded-full"
          />
        </div>
      </div>

      {!currentTask.done && (
        <div className="mt-auto flex justify-center w-full fixed bottom-20 left-0 p-4">
          <SwipeToComplete
            onComplete={(completed) => {
              if (completed) {
                toggleTaskDone(currentTask.id);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
