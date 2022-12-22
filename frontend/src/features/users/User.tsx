import useFetch from "../../hooks/useFetch";
import { PostType } from "../../pages/posts";
import { UserType } from "../../pages/users";
import Post from "../posts/Post";

export default function User({ user }: { user: UserType }) {
  const { response, fetchData } = useFetch();

  const handleDelete = () => {
    fetchData("users", "DELETE", { _id: user._id });
  };

  return (
    <div key={user._id} className={`flex flex-col gap-2`}>
      <div>
        Email: <span className={`font-medium text-lg`}>{user.email}</span>
      </div>
      <div className={`my-4 flex flex-col gap-4`}>
        {user.posts &&
          user.posts.map((post: PostType) => (
            <Post post={post} key={post._id} />
          ))}
      </div>
      <button
        onClick={handleDelete}
        className={`bg-blue-500 text-white p-2 px-4 rounded-md`}
      >
        Delete
      </button>
      <div className={`bg-blue-50 text-blue-700 p-2 px-4 rounded-md`}>
        {JSON.stringify(response)}
      </div>
    </div>
  );
}
