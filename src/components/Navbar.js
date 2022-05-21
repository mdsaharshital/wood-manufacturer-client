import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logoimg from "../asstes/images/logoImg.png";

const Navbar = ({ children }) => {
  const menuBars = (
    <>
      <li className="mr-2 ">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="mr-2 ">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="mr-2 ">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="mr-2">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="mr-2 ">
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li className="mr-2">
        <NavLink to="/blog">Blog</NavLink>
      </li>
    </>
  );
  return (
    <div class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col bg-secondary">
        {/* <!-- Navbar --> */}
        <div class="w-full navbar bg-primary">
          <div class="flex-1 px-2 mx-2 uppercase lg:hidden">
            <span className="text-center w-full  flex justify-center">
              <img src={logoimg} className="text-center block w-24 " alt="" />
            </span>
          </div>
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="flex-none hidden lg:block mx-auto">
            <ul class="menu menu-horizontal text-slate-300">
              {/* <!-- Navbar menu content here --> */}
              {menuBars}
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        {children}
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-primary text-slate-300">
          {/* <!-- Sidebar content here --> */}
          {menuBars}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
