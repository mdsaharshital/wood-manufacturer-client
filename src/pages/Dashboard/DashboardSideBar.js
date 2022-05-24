import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardSideBar = ({ children }) => {
  return (
    <div class="drawer drawer-mobile">
      <input
        id="dashboard-sidebar-menu"
        type="checkbox"
        class="drawer-toggle"
      />
      <div class="drawer-content ">
        {/* <!-- Page content here --> */}
        {children}
        <Outlet />
      </div>
      <div class="drawer-side">
        <label for="dashboard-sidebar-menu" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="myorders">My orders</Link>
          </li>
          <li>
            <Link to="myreviews">My reviews</Link>
          </li>
          <li>
            <Link to="myprofile">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
