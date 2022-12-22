import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Post from "../../features/posts/Post";
import useFetch from "../../hooks/useFetch";

type PostFormType = {
  title: string;
  body: string;
};

export type PostType = {
  _id: string;
  title: string;
  body: string;
  user: string;
};

export default function Posts() {
  const { response, fetchData } = useFetch();
  const { response: postResponse, fetchData: postFetchData } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormType>();

  useEffect(() => {
    fetchData("posts");
  }, []);

  const onSubmit = handleSubmit((data) => {
    postFetchData("posts", "POST", data);
  });

  return (
    <div className={`container mt-4 mx-auto`}>
      <form onSubmit={onSubmit} className={`flex flex-col gap-4`}>
        <input
          type="text"
          placeholder="Title"
          className={`px-4 py-2 bg-gray-50 rounded-md border focus:outline-none focus:ring focus:border-blue-500`}
          {...register("title")}
        ></input>
        <input
          type="text"
          placeholder="Body"
          className={`px-4 py-2 bg-gray-50 rounded-md border focus:outline-none focus:ring focus:border-blue-500`}
          {...register("body")}
        ></input>
        <button
          className={`text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2`}
        >
          Submit
        </button>
      </form>
      <div className={`mt-8 flex flex-col gap-4`}>
        {response &&
          response.posts instanceof Array &&
          response.posts.map((post: PostType) => {
            return <Post post={post} key={post._id} />;
          })}
      </div>
    </div>
  );
}
