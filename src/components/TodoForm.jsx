// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { TodoContext } from '../Context/TodoContext';
// import InputField from '../UiComponents/InputField';
// import AddTaskButton from '../UiComponents/AddTaskButton';
// import Button from '../UiComponents/Button';
// import TaskBoard from '../components/TaskBoard';

// const TodoForm = () => {
//   const { tasks, addTask, user } = useContext(TodoContext);
//   const [taskName, setTaskName] = useState('');
//   const [description, setDescription] = useState('');
//   const [deadlineDate, setDeadlineDate] = useState('');
//   const [deadlineTime, setDeadlineTime] = useState('');
//   const [isInputVisible, setIsInputVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (taskName.trim() === '') return;
//     let formattedDeadline = null;
//     if (deadlineDate && deadlineTime) {
//       const deadlineCombined = new Date(`${deadlineDate}T${deadlineTime}`);
//       formattedDeadline = deadlineCombined.toISOString();
//     }
//     addTask(taskName, description, formattedDeadline);
//     setTaskName('');
//     setDescription('');
//     setDeadlineDate('');
//     setDeadlineTime('');
//     setIsInputVisible(false);
//   };

//   return (
//     <div className="p-2 bg-[#111C2E] min-h-screen text-white w-screen max-w-md mx-auto">
//       <div className="flex gap-4 mb-4">
//         <button
//           onClick={() => navigate(-1)} 
//           className="w-12 h-12 bg-[#111C2E] text-white rounded-full flex items-center justify-center"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} size="lg" />
//         </button>
//       </div>

//       {isInputVisible ? (
//         <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
//           <h2 className="text-2xl mb-6 text-center">Add a New Task</h2>
//           <InputField
//             placeholder="Enter task name..."
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//           />
//           <InputField
//             placeholder="Enter task description..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <div className="flex flex-col space-y-2">
//             <label className="text-white">Select Date:</label>
//             <input
//               type="date"
//               value={deadlineDate}
//               onChange={(e) => setDeadlineDate(e.target.value)}
//               className="p-2 w-full rounded-md text-black"
//             />
//           </div>
//           <div className="flex flex-col space-y-2">
//             <label className="text-white">Select Time:</label>
//             <input
//               type="time"
//               value={deadlineTime}
//               onChange={(e) => setDeadlineTime(e.target.value)}
//               className="p-2 w-full rounded-md text-black"
//             />
//           </div>
//           <div className="mt-4 flex justify-between">
//             <Button text="Add" onClick={handleSubmit} />
//             <Button text="Cancel" onClick={() => setIsInputVisible(false)} />
//           </div>
//         </form>
//       ) : (
//         <TaskBoard tasks={tasks} onTaskClick={(taskId) => {}} />
//       )}
//       <div className="flex justify-center z-30">
//         {!isInputVisible && (
//           <AddTaskButton onClick={() => setIsInputVisible(true)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TodoForm;
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TodoContext } from '../Context/TodoContext';
import InputField from '../UiComponents/InputField';
import AddTaskButton from '../UiComponents/AddTaskButton';
import Button from '../UiComponents/Button';
import TaskBoard from '../components/TaskBoard';

const TodoForm = () => {
  const { tasks, addTask, updateTask, user } = useContext(TodoContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State variables for the input fields
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  
  // State to differentiate between add and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Check if navigation state contains a task to edit
  useEffect(() => {
    if (location.state && location.state.task) {
      const taskToEdit = location.state.task;
      setTaskName(taskToEdit.name);
      setDescription(taskToEdit.description || '');
      
      if (taskToEdit.deadline) {
        const deadline = new Date(taskToEdit.deadline);
        // Format the date as YYYY-MM-DD and time as HH:mm
        const formattedDate = deadline.toISOString().split('T')[0];
        const formattedTime = deadline.toISOString().split('T')[1].slice(0, 5);
        setDeadlineDate(formattedDate);
        setDeadlineTime(formattedTime);
      }
      setIsInputVisible(true);
      setIsEditing(true);
      setEditingTaskId(taskToEdit.id);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === '') return;
    
    let formattedDeadline = null;
    if (deadlineDate && deadlineTime) {
      const deadlineCombined = new Date(`${deadlineDate}T${deadlineTime}`);
      formattedDeadline = deadlineCombined.toISOString();
    }
    
    if (isEditing) {
      // Update the existing task
      updateTask(editingTaskId, taskName, description, formattedDeadline);
    } else {
      // Add a new task
      addTask(taskName, description, formattedDeadline);
    }
    
    // Clear the form fields and reset editing states
    setTaskName('');
    setDescription('');
    setDeadlineDate('');
    setDeadlineTime('');
    setIsInputVisible(false);
    setIsEditing(false);
    setEditingTaskId(null);
    // Optionally navigate back or show a success message here
  };

  return (
    <div className="p-2 bg-[#111C2E] min-h-screen text-white w-screen max-w-md mx-auto">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate(-1)} 
          className="w-12 h-12 bg-[#111C2E] text-white rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>
      </div>

      {isInputVisible ? (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
          <h2 className="text-2xl mb-6 text-center">
            {isEditing ? "Edit Task" : "Add a New Task"}
          </h2>
          <InputField
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <InputField
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col space-y-2">
            <label className="text-white">Select Date:</label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="p-2 w-full rounded-md text-black"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-white">Select Time:</label>
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className="p-2 w-full rounded-md text-black"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <Button text={isEditing ? "Update" : "Add"} onClick={handleSubmit} />
            <Button 
              text="Cancel" 
              onClick={() => {
                setIsInputVisible(false);
                setIsEditing(false);
                setEditingTaskId(null);
              }} 
            />
          </div>
        </form>
      ) : (
        <TaskBoard tasks={tasks} onTaskClick={(taskId) => {}} />
      )}
      <div className="flex justify-center z-30">
        {!isInputVisible && (
          <AddTaskButton onClick={() => setIsInputVisible(true)} />
        )}
      </div>
    </div>
  );
};

export default TodoForm;
