import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "./../../hooks/useAdmin";
import auth from "./../../firebase.init";
import Footer from "../../components/Footer";

const DashboardSideBar = ({ children }) => {
  const [user] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);
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

        <Footer />
      </div>
      <div class="drawer-side">
        <label for="dashboard-sidebar-menu" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {isAdmin || (
            <>
              <li>
                <Link to="myorders">My orders</Link>
              </li>
              <li>
                <Link to="myreviews">My reviews</Link>
              </li>
            </>
          )}
          <li>
            <Link to="myprofile">My Profile</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="addaproduct">Add Product</Link>
              </li>
              <li>
                <Link to="manageproducts">Manage Product</Link>
              </li>
              <li>
                <Link to="manageallorders">Manage all orders</Link>
              </li>
              <li>
                <Link to="makeAdmin">Make Admin</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
