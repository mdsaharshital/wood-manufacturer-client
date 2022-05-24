import React, { useState } from "react";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  //
  return [isAdmin];
};

export default useAdmin;
