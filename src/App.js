import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hero from "./pages/Home/Hero";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
      </Routes>
    </div>
  );
}

export default App;
