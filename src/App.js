import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Home/ProductDetails";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/SignInSignUp/SignIn";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
        <ToastContainer />
      </Navbar>
    </div>
  );
}

export default App;
