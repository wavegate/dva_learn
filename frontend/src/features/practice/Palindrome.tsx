import { SyntheticEvent, useState } from "react";

function Child({ str }: { str: string }) {
  const isPalindrome = (str: string) => {
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      {isPalindrome(str) ? (
        <div className={`w-12 h-12 bg-green-500`}></div>
      ) : (
        <div className={`w-12 h-12 bg-red-500`}></div>
      )}
    </div>
  );
}

export default function Palindrome() {
  const [str, setStr] = useState<string>("");

  function handleChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      setStr(e.target.value);
    }
  }

  return (
    <div className={`flex flex-col gap-4 items-center`}>
      <input
        type="text"
        onChange={handleChange}
        className={`py-2 px-4 border border-black-500 rounded-md focus:outline-none focus:border-blue-500 focus:ring w-full`}
        placeholder="Enter input string"
      ></input>
      <Child str={str} />
    </div>
  );
}
