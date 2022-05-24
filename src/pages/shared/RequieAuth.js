import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "./../../firebase.init";
import Loading from "./Loading";

const RequieAuth = () => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequieAuth;
