import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAdmin from "./../../hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RequireAdmin;
