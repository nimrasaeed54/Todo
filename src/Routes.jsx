import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import TodoForm from "./components/TodoForm";
import TaskDetails from "./components/TaskDetails";
import Userlayout from "./layout/Userlayout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<Userlayout />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/add-todo" element={<TodoForm />} />
     
        </Route>
        <Route path="task/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
