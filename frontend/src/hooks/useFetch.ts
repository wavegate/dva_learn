import { useState } from "react";

export default function useFetch() {
  const [response, setResponse] = useState<any>(null);

  async function fetchData(
    url: string,
    method: string = "GET",
    data: any = null
  ) {
    try {
      setResponse("loading...");
      let fetchResponse;
      switch (method) {
        case "GET": {
          fetchResponse = await fetch(`http://localhost:5000/${url}`, {
            credentials: "include",
          });
          break;
        }
        case "POST": {
          fetchResponse = await fetch(`http://localhost:5000/${url}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        }
        case "DELETE": {
          fetchResponse = await fetch(`http://localhost:5000/${url}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        }
      }
      const fetchData = await fetchResponse?.json();
      setResponse(fetchData);
    } catch (error) {
      setResponse(JSON.stringify(error));
    }
  }

  return { response, fetchData };
}
