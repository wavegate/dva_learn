import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function Users() {
  const { response: users, error, loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData("users");
  }, []);

  return <div className="Users">{JSON.stringify(users)}</div>;
}
