import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { response, fetchData } = useFetch();

  const onSubmit = handleSubmit((data) => {
    fetchData("users/login", "POST", data);
  });

  return (
    <div className={`container mx-auto mt-12`}>
      <form onSubmit={onSubmit} className={`flex flex-col gap-4`}>
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-md p-2 px-4 focus:outline-none focus:ring focus:border-blue-500`}
        ></input>
        <input
          type="text"
          placeholder="Password"
          {...register("password")}
          className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-md p-2 px-4 focus:outline-none focus:ring focus:border-blue-500`}
        ></input>
        <button
          type="submit"
          className={`bg-blue-500 text-white rounded-md p-2 px-4 hover:bg-blue-600`}
        >
          Submit
        </button>
        <div className={`bg-blue-50 p-2 px-4 rounded-md text-blue-700`}>
          {JSON.stringify(response)}
        </div>
      </form>
    </div>
  );
}
