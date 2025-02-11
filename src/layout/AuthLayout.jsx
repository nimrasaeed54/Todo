import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Userlayout from "./Userlayout";

const isAuthenticated = () => {
  return localStorage.getItem("userToken");
};

const AuthLayout = () => {
  return isAuthenticated() ? <Userlayout/> : <Navigate to="/login" />;
};

export default AuthLayout;
