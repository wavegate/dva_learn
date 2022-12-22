import { SyntheticEvent, useState } from "react";

function useMatch() {
  const [matches, setMatches] = useState<boolean>(false);

  function matchStrings(str1: string, str2: string) {
    setMatches(str1 === str2);
  }

  return [matches, matchStrings] as const;
}

export default function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordVerification: "",
  });
  const [matches, matchStrings] = useMatch();

  function handleChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    matchStrings(formData.password, formData.passwordVerification);
  }

  return (
    <div>
      <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
        <input
          type="text"
          className={`px-4 py-2 border border-black-500 focus:outline-none focus:ring focus:border-blue-500 bg-gray-50 rounded-md`}
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        ></input>
        <input
          type="text"
          className={`px-4 py-2 border border-black-500 focus:outline-none focus:ring focus:border-blue-500 bg-gray-50 rounded-md`}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        ></input>
        <input
          type="text"
          className={`px-4 py-2 border border-black-500 focus:outline-none focus:ring focus:border-blue-500 bg-gray-50 rounded-md`}
          placeholder="Verify password"
          name="passwordVerification"
          onChange={handleChange}
          value={formData.passwordVerification}
        ></input>
        <button
          className={`bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-md`}
        >
          Submit
        </button>
        <div className={`px-4 py-2 bg-blue-50 text-blue-700 rounded-md`}>
          {matches
            ? `Username: ${formData.username} | Email: ${formData.email}`
            : "Error: passwords do not match."}
        </div>
      </form>
    </div>
  );
}
