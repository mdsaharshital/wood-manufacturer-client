import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "./../../hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const [user] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);
  console.log(isAdmin);
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RequireAdmin;
