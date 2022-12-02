import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../firebase.init";
import Loading from "./../pages/shared/Loading";

const useAdmin = (user) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://wood-manufacturer-server-production.up.railway.app/admin/${user?.email}`,
      {
        method: "get",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.admin);
        setIsAdmin(data.admin);
        setAdminLoading(false);
      });
  }, [user]);

  return [isAdmin, adminLoading];
};

export default useAdmin;
