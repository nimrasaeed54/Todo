
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

  // Use the "done" property consistently
  const activeTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  const data = [
    {
      label: "Tasks",
      value: "tasks",
      desc: (
        <div>
          <div className="flex justify-end gap-2 sm:gap-4 mt-4">
            <button
              onClick={() => setTaskStatus("active")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold transition ${
                taskStatus === "active"
                  ? "bg-[#7B8DEC] text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTaskStatus("done")}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-lg font-semibold transition ${
                taskStatus === "done"
                  ? "bg-[#7B8DEC] text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              Done
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-4">
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
              <p className="text-center text-sm text-gray-400">
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
    <div className="w-full max-w-md mx-auto">
      <Tabs value={activeTab}>
        <TabsHeader className="relative flex shadow-none border-none bg-transparent">
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`flex-1 text-center px-4 py-2 text-lg font-semibold transition ${
                activeTab === value
                  ? "text-[#7B8DEC] border-b-2 border-[#7B8DEC]"
                  : "text-gray-300"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {value === "tasks" && (
                  <span className="rounded-full bg-gray-800 text-white text-xs sm:text-lg w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center">
                    {tasks.length}
                  </span>
                )}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>

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
