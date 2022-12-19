import { useState } from "react";

export default function useFetch() {
  const [error, setError] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(
    url: string,
    method: string = "GET",
    data: any = null
  ) {
    try {
      setLoading(true);
      let fetchResponse;
      switch (method) {
        case "GET": {
          fetchResponse = await fetch(`http://localhost:5000/${url}`);
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
      }
      if (fetchResponse?.ok) {
        const fetchData = await fetchResponse.json();
        setResponse(fetchData);
        setLoading(false);
      }
    } catch (error) {
      setError(JSON.stringify(error));
      setLoading(false);
    }
  }

  return { error, response, loading, fetchData };
}
