import { SyntheticEvent, useState } from "react";

export function useFetch() {
  const [response, setResponse] = useState<any>();

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setResponse(json);
      }
    } catch (error) {
      setResponse(JSON.stringify(error));
    }
  }

  return [response, fetchData] as const;
}

export default function Address() {
  const [response, fetchData] = useFetch();
  const [userID, setUserID] = useState<string>("");

  function handleChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      setUserID(e.target.value);
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    fetchData(`https://jsonplaceholder.typicode.com/users?id=${userID}`);
  }

  return (
    <div>
      <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter user ID"
          className={`px-4 py-2 bg-gray-50 border border-black-500 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
          onChange={handleChange}
        ></input>
        <button
          className={`bg-blue-500 text-white hover:bg-blue-600 py-2 rounded-md`}
        >
          Submit
        </button>
        <div className={`bg-blue-50 text-blue-700 px-4 py-2 rounded-md`}>
          {response && response.length && response.length === 1
            ? `Name: ${response[0].name} | Street address: ${response[0].address?.street}`
            : "No response"}
        </div>
      </form>
    </div>
  );
}
