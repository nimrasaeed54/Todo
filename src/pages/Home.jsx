import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../Context/TodoContext';
import AddTaskButton from '../UiComponents/AddTaskButton';
import TaskBoard from '../components/TaskBoard';

const Home = () => {
  const { tasks } = useContext(TodoContext);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('active');

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 16) return 'Good Afternoon';
    if (hour < 19) return 'Good Evening';
    return 'Good Night';
  };

  const formattedDate = time.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedDay = time.toLocaleDateString(undefined, { weekday: 'long' });

  const activeTasks = tasks.filter(task => !task.done);
  const doneTasks = tasks.filter(task => task.done);
  const displayedTasks = selectedTab === 'active' ? activeTasks : doneTasks;

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-[#111C2E] text-white flex flex-col items-center px-4 md:px-8 py-6">
      <div className="w-full max-w-md md:max-w-lg h-[30vh] flex flex-col justify-center items-start rounded-lg p-4 md:p-6 mb-6 text-left">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#7B8DEC] mb-2">
          {getGreeting()}
        </h2>
        <p className="text-lg md:text-xl mt-4 text-white">
          Today's {formattedDay}
        </p>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          {formattedDate}
        </p>
      </div>

      <div className="w-full max-w-md md:max-w-lg">
        <TaskBoard tasks={tasks} onTaskClick={handleTaskClick} />
      </div>

      <div className="fixed bottom-6 right-6 z-10 md:bottom-8 md:right-8">
        <AddTaskButton onClick={() => navigate('/add-todo')} />
      </div>
    </div>
  );
};

export default Home;
