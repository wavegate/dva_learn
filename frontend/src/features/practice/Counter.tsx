import { useEffect, useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(true);

  const toggleRunning = () => {
    setRunning((running) => !running);
  };

  useEffect(() => {
    if (running) {
      const intervalID = setInterval(
        () => setCounter((counter) => counter + 1),
        1000
      );
      return () => clearInterval(intervalID);
    }
  }, [running]);

  return (
    <div className={`mx-auto w-64 flex flex-col items-center gap-2`}>
      <div>Counter: {counter}</div>
      <button
        onClick={toggleRunning}
        className={`p-2 px-4 rounded-md bg-blue-500 text-white`}
      >
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}
