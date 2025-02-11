import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../Context/TodoContext";
import AddTaskButton from "../UiComponents/AddTaskButton";
import TaskBoard from "../components/TaskBoard";

const Home = () => {
  const { tasks } = useContext(TodoContext);
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("active");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    if (hour < 19) return "Good Evening";
    return "Good Night";
  };

  const formattedDate = time.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedDay = time.toLocaleDateString(undefined, { weekday: "long" });

  const activeTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);
  const displayedTasks = selectedTab === "active" ? activeTasks : doneTasks;

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-[#111C2E] text-white flex flex-col items-center px-3 lg:py-2 py-5 max-w-md w-full mx-auto relative overflow-hidden">
 
      <div className="w-full flex flex-col justify-center items-start rounded-lg p-2 md:p-6 text-left">
        <h2 className="text-6xl sm:text-9xl md:text-6xl lg:text-5xl font-bold text-[#7B8DEC]">
          {getGreeting()}
        </h2>
        <p className="text-lg md:text-xl mt-2 text-white">{formattedDay}</p>
        <p className="text-sm md:text-base text-gray-400">{formattedDate}</p>
      </div>

      <div className="w-full flex-grow">
        <TaskBoard tasks={displayedTasks} onTaskClick={handleTaskClick} />
      </div>

      
      <div className="absolute bottom-6 right-6 z-10">
        <AddTaskButton onClick={() => navigate("/app/add-todo")} />
      </div>
    </div>
  );
};

export default Home;
