import { useEffect, useState } from "react";

export default function Convert() {
  const [data, setData] = useState<any>({ text: "Welcome!", data: [] });

  function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData({ data: json }));
  }

  useEffect(() => {
    setData({ text: "GeeksforGeeks" });
    getPosts();
  }, []);

  return (
    <div>
      <h1>{data.text}</h1>
    </div>
  );
}
