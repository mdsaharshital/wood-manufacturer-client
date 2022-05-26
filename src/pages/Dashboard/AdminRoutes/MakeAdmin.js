import React from "react";
import SentionTitle from "./../../../components/SentionTitle";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const MakeAdmin = () => {
  const [getUser] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery("users", () =>
    fetch("https://hidden-crag-61724.herokuapp.com/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        return toast.error("Unauthentic user");
      }
      return res.json();
    })
  );
  if (isLoading) return <Loading />;
  const handleAdmin = async (email) => {
    console.log(email);
    fetch(`https://hidden-crag-61724.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 403) {
          toast.error("Can't perfome this action");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          refetch();
          toast.success("Added as admin");
        }
      });
  };
  return (
    <div>
      <SentionTitle>Make Admin</SentionTitle>
      <h1 className="text-xl p-3 ">Total users: {data.length}</h1>
      <div class="overflow-x-auto p-3">
        <table class="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((user, index) => (
              <tr key={index}>
                <th>1</th>
                <td>
                  {getUser.email === user.email
                    ? user.email + " (You)"
                    : user.email}
                </td>
                <td>{user.role ? user.role : "User"}</td>
                <td>
                  {user.role === "admin" || (
                    <button
                      onClick={() => handleAdmin(user?.email)}
                      className="btn btn-sm btn-primary text-white rounded-none"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
