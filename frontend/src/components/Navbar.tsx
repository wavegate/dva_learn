import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/users">Users</Link>
      <Link to="/users/register">Register</Link>
      <Link to="/users/login">Login</Link>
    </div>
  );
}
