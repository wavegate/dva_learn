import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={`sticky w-full`}>
      <div className={`container flex mx-auto`}>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${
              isActive && `bg-blue-500 text-white`
            } p-4 hover:bg-blue-500 hover:text-white`
          }
          end
        >
          Users
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `${
              isActive && `bg-blue-500 text-white`
            } p-4 hover:bg-blue-500 hover:text-white`
          }
          end
        >
          Posts
        </NavLink>
        <NavLink
          to="/users/register"
          className={({ isActive }) =>
            `${
              isActive && `bg-blue-500 text-white`
            } p-4 hover:bg-blue-500 hover:text-white`
          }
        >
          Register
        </NavLink>
        <NavLink
          to="/users/login"
          className={({ isActive }) =>
            `${
              isActive && `bg-blue-500 text-white`
            } p-4 hover:bg-blue-500 hover:text-white`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `${
              isActive && `bg-blue-500 text-white`
            } p-4 hover:bg-blue-500 hover:text-white`
          }
        >
          Practice
        </NavLink>
      </div>
    </div>
  );
}
