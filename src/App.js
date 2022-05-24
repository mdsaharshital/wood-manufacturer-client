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
          </Route>
        </Routes>
        <ToastContainer />
      </Navbar>
    </div>
  );
}

export default App;
