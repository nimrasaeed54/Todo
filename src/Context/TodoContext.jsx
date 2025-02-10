import React, { createContext, useState, useEffect } from 'react';
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const storedUserEmail = localStorage.getItem('user');
  const usersData = JSON.parse(localStorage.getItem('usersData')) || {};

  const [user, setUser] = useState(storedUserEmail ? usersData[storedUserEmail] : null);
  const [tasks, setTasks] = useState(user?.tasks || []);

  useEffect(() => {
    setTasks(user?.tasks || []);
  }, [user]);

  const login = (email, password, imgLink = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {};
    if (!usersData[email]) {
      usersData[email] = { email, password, imgLink, tasks: [] };
    } else if (usersData[email].password !== password) {
      alert('Incorrect password');
      return;
    }
    setUser(usersData[email]);
    setTasks(usersData[email].tasks);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.setItem('user', email);
  };

  const logout = () => {
    setUser(null);
    setTasks([]);
    localStorage.removeItem('user');
  };

  const toggleTaskDone = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
     updateUserData(updatedTasks);
    };
    

  const addTask = (name, description, deadline) => {
    if (!user) return;
    const newTask = {
      id: Date.now(),
      name,
      description,
      deadline,
      done: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateUserData(updatedTasks);
  };

  const updateUserData = (updatedTasks) => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {};
    usersData[user.email] = { ...user, tasks: updatedTasks };
    localStorage.setItem('usersData', JSON.stringify(usersData));
    setUser(usersData[user.email]);
  };

  return (
    <TodoContext.Provider value={{ user, login, logout, tasks, addTask, toggleTaskDone }}>
      {children}
    </TodoContext.Provider>
  );
};
