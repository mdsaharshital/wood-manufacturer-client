import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog/Blog";
import Hero from "./pages/Home/Hero";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
