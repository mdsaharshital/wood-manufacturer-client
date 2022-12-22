import { useState, useEffect } from "react";
const useToken = (user) => {
  const [token, setToken] = useState("");
  const currentUser = {
    email: user?.email,
  };
  console.log("hola", currentUser);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://wood-manufacturer-server.onrender.com/login/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
          setToken(data.accessToken);
        });
    }
  }, [user]);
  return [token];
};
export default useToken;
