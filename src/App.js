import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Home/ProductDetails";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/SignInSignUp/SignIn";
import SignUp from "./pages/SignInSignUp/SignUp";
import RequieAuth from "./pages/shared/RequieAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyOrders from "./pages/Dashboard/MyOrders";
import MyReview from "./pages/Dashboard/MyReview";
import MyProfile from "./pages/Dashboard/MyProfile";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {/* -------private route here------- */}
          <Route element={<RequieAuth />}>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/payment/:id" element={<Payment />}></Route>
            {/* // dashboard routes */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="myorders" element={<MyOrders />}></Route>
              <Route path="myreviews" element={<MyReview />}></Route>
              <Route path="myprofile" element={<MyProfile />}></Route>
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </Navbar>
    </div>
  );
}

export default App;
