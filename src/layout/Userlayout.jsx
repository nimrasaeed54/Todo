import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';

export default function Userlayout() {

  return (
    <div>
      <Navbar />
      <Outlet />
      <BottomNavbar />
    </div>
  );
}
