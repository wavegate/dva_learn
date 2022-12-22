import { useEffect, useState } from "react";
import { useFetch } from "./Address";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);

  function handleClick() {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          signal: controller.signal,
        }
      );
      const data = await response.json();
      console.log("running");
      setUsers((prevState) => [...prevState, ...data]);
    }
    fetchData();
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          signal: controller.signal,
        }
      );
      const data = await response.json();
      setUsers((prevState) => [...prevState, ...data]);
    }
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className={`flex flex-col gap-4`}>
      <button
        onClick={handleClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600`}
      >
        Get users
      </button>
      <div
        className={`px-4 py-2 rounded-md bg-pink-50 flex flex-col gap-4 text-pink-900`}
      >
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div key={index}>
                <div>{user.id}</div>
                <div>{user.name}</div>
                <div>{user.email}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
