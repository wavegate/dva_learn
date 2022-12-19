import { useState } from "react";
import Users from "./pages/users";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/users/register";
import Login from "./pages/users/login";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
