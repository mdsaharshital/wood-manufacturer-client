import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Home/ProductDetails";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
