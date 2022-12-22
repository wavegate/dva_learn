import { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  firstName: z
    .string()
    .regex(new RegExp("^[a-zA-z]+$"), { message: "Invalid first name." }),
  dob: z
    .string()
    .regex(new RegExp("^\\d{4}-\\d{2}-\\d{2}$"), { message: "Invalid date." }),
});

type FormDataType = {
  firstName: string;
  dob: Date;
};

export default function DOB() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataType>({ resolver: zodResolver(schema) });

  const [show, setShow] = useState<boolean>(false);

  const onSubmit = (data: FormDataType) => {
    setShow(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4`}>
        <input
          type="text"
          className={`px-4 py-2 border border-black-500 focus:ring focus:outline-none focus:border-blue-500 bg-gray-50 rounded-md`}
          placeholder="First name"
          {...register("firstName")}
        ></input>
        {errors.firstName?.message && (
          <div className={`px-4 py-2 bg-red-50 text-red-700`}>
            {errors.firstName?.message}
          </div>
        )}
        <input
          type="date"
          className={`px-4 py-2 border border-black-500 focus:ring focus:outline-none focus:border-blue-500 bg-gray-50 rounded-md`}
          {...register("dob")}
        ></input>
        {errors.dob?.message && (
          <div className={`px-4 py-2 bg-red-50 text-red-700`}>
            {errors.dob?.message}
          </div>
        )}
        <button
          className={`py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md`}
        >
          Submit
        </button>
        {show && (
          <div className={`bg-blue-50 text-blue-700 px-4 py-2`}>
            {JSON.stringify(watch())}
          </div>
        )}
      </form>
    </div>
  );
}
