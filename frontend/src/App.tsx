import { useState } from "react";
import Users from "./pages/users";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/users/register";
import Login from "./pages/users/login";
import Practice from "./pages/practice";
import Navbar from "./components/Navbar";
import Posts from "./pages/posts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  );
}

export default App;
