import { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState<Date>(new Date());

  function tick() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  );
}
