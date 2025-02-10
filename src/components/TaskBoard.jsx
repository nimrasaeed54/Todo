import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TaskCard from "../UiComponents/TaskCard";

const Taskboard = ({ tasks = [], onTaskClick }) => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [taskStatus, setTaskStatus] = useState("active");
  const activeTasks = tasks.filter((task) => !task.completed);
  const doneTasks = tasks.filter((task) => task.completed);

  const data = [
    {
      label: "Tasks",
      value: "tasks",
      desc: (
        <div>

          <div className="flex justify-end gap-2 sm:gap-4 mt-4">
            <button
              onClick={() => setTaskStatus("active")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold transition ${taskStatus === "active"
                  ? "bg-[#7B8DEC] text-white"
                  : "bg-gray-700 text-gray-300"
                }`}
            >
              Active
            </button>
            <button
              onClick={() => setTaskStatus("done")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold transition ${taskStatus === "done"
                  ? "bg-[#7B8DEC] text-white"
                  : "bg-gray-700 text-gray-300"
                }`}
            >
              Done
            </button>
          </div>

          <div className=" mt-4">
            {taskStatus === "active" && activeTasks.length > 0 ? (
              activeTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onClick={() => onTaskClick(task.id)}
                />
              ))
            ) : taskStatus === "done" && doneTasks.length > 0 ? (
              doneTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onClick={() => onTaskClick(task.id)}
                />
              ))
            ) : (
              <p className="text-center text-sm  text-gray-400">
                No {taskStatus} tasks available
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      label: "Boards",
      value: "boards",
      desc: (
        <div className="text-center text-sm text-gray-400">
          Board content goes here.
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto ">
      <Tabs value={activeTab} onChange={setActiveTab} className="">
        <TabsHeader
          className="bg-transparent border-b-0 flex justify-center"
          indicatorProps={{
            className: "hidden",
            
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={`text-sm sm:text-xl font-bold !bg-transparent px-4 sm:px-6 rounded-lg transition-all duration-300 ${activeTab === value
                  ? "text-[#7B8DEC] text-3xl bg-[#7B8DEC] shadow-md"
                  : "text-gray-300 text-3xl"
                }`}
            >
              {value === "tasks" ? (
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gray-800 text-white text-xs sm:text-lg w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center">
                    {tasks.length}
                  </span>
                  {label}
                </div>
              ) : (
                label
              )}
            </Tab>
          ))}
        </TabsHeader>
        <hr className="my-3 border-gray-600" />
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-2 sm:p-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default Taskboard;
