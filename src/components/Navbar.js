import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoimg from "../asstes/images/logoImg.png";
import auth from "./../firebase.init";
import Loading from "./../pages/shared/Loading";
import Footer from "./Footer";
import { BiUser } from "react-icons/bi";

const Navbar = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    // navigate
    // navigate("/signin");
    localStorage.removeItem("accessToken");
  };
  if (loading) return <Loading />;
  const menuBars = (
    <>
      <li className="mr-2 ">
        <NavLink to="/">Home</NavLink>
      </li>

      {user && (
        <li className="mr-2 ">
          <NavLink to="/dashboard/myprofile">Dashboard</NavLink>
        </li>
      )}
      <li className="mr-2 ">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="mr-2 ">
        <NavLink to="/myportfolio">My portfolio</NavLink>
      </li>
      {user ? (
        <li className="mr-2 ">
          <span onClick={logout}>Sign out</span>
        </li>
      ) : (
        <li className="mr-2 ">
          <NavLink to="/signin">Login</NavLink>
        </li>
      )}
      {user && (
        <li className="mr-2 ">
          <span>
            <BiUser />
            {user?.displayName}
          </span>
        </li>
      )}
    </>
  );
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-secondary">
        {/* <!-- Navbar --> */}
        <div className="w-full navbar bg-primary">
          {pathname.includes("dashboard") && (
            <div className="flex-none lg:hidden">
              <label
                htmlFor="dashboard-sidebar-menu"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          )}
          <div className="flex-1 px-2 mx-2 uppercase lg:hidden">
            <span
              htmlFor="dashboard-sidebar-menu"
              className="text-center w-full  flex justify-center"
            >
              <img
                src={logoimg}
                className="text-center block w-20 py-2"
                alt=""
              />
            </span>
          </div>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-none hidden lg:block mx-auto">
            <ul className="menu menu-horizontal text-slate-300">
              {/* <!-- Navbar menu content here --> */}
              {menuBars}
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        {children}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-primary text-slate-300">
          {/* <!-- Sidebar content here --> */}
          {menuBars}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
