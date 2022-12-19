import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";

type RegisterFormData = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { response, error, loading, fetchData } = useFetch();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    fetchData("users", "POST", data);
  });

  return (
    <div className="Register">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Email" {...register("email")}></input>
        <input
          type="text"
          placeholder="Password"
          {...register("password")}
        ></input>
        <button type="submit">Submit</button>
        {JSON.stringify(response)}
      </form>
    </div>
  );
}
