import React from 'react';
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import TodoForm from './components/TodoForm';
import Navbar from './components/Navbar';
import TaskDetails from './components/TaskDetails';
import BottomNavbar from './components/BottomNavbar';
const AppRoutes = () => { 
  return (
    <Router>
      <RouterRoutes> 
        <Route path="/" element={<Login />} />
        <Route 
          path="/home" 
          element={
            <>
              <Navbar/> 
              <Home /><BottomNavbar/>
            </>
          } 
        />
        <Route path="/add-todo" element={<><TodoForm /><BottomNavbar/></>}/>
        <Route path="/task/:id" element={<><TaskDetails/></>} />
      </RouterRoutes>
    </Router>
  );
};

export default AppRoutes;
