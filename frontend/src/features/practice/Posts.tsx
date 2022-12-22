import { SyntheticEvent, useEffect, useState } from "react";
import { useFetch } from "./Address";

type User = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Posts() {
  const [response, fetchData] = useFetch();
  const [filter, setFilter] = useState<string>("");

  function handleChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      setFilter(e.target.value);
    }
  }

  useEffect(() => {
    fetchData(`https://jsonplaceholder.typicode.com/posts`);
  }, []);

  function filterUser(user: User, filterString: string) {
    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    const regFilterString = new RegExp(escapeRegExp(filterString), "i");
    if (
      regFilterString.test(String(user.userId)) ||
      regFilterString.test(String(user.id)) ||
      regFilterString.test(user.title) ||
      regFilterString.test(user.body)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className={`flex flex-col gap-4`}>
      <input
        type="text"
        placeholder="Enter search term"
        className={`px-4 py-2 bg-gray-50 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
        onChange={handleChange}
      ></input>

      <div
        className={`bg-blue-50 text-blue-700 rounded-md flex flex-col gap-2`}
      >
        {response instanceof Array ? (
          <table>
            <thead>
              <tr className={`[&>th]:px-4`}>
                <th>User id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody className={`[&>tr:nth-child(odd)]:bg-blue-100`}>
              {response
                .filter((user: User) => filterUser(user, filter))
                .map((user: User, index: number) => {
                  return (
                    <tr className={`[&>td]:p-2`} key={index}>
                      <td className={`text-center`}>{user.userId}</td>
                      <td className={`text-center`}>{user.id}</td>
                      <td>{user.title}</td>
                      <td>{user.body}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}
