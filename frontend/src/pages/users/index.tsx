import { useEffect } from "react";
import User from "../../features/users/User";
import useFetch from "../../hooks/useFetch";

export type UserType = {
  email: string;
  _id: string;
  posts: Array<any>;
};

export default function Users() {
  const { response, fetchData } = useFetch();

  useEffect(() => {
    fetchData("users");
  }, []);

  return (
    <div className={`container mx-auto mt-4`}>
      <div className="Users">
        {response?.users &&
          response?.users.map((user: UserType) => (
            <User user={user} key={user._id} />
          ))}
      </div>
    </div>
  );
}
