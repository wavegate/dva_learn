import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFetch } from "./Address";

const schema = z.object({
  search: z.string(),
});

type FormType = {
  search: string;
};

export default function Swanson() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  const [response, fetchData] = useFetch();
  const [firstQuote, fetchFirstQuote] = useFetch();
  const [responseDisplay, setResponseDisplay] = useState<string>("");

  function onSubmit(data: FormType) {
    fetchData(
      `https://ron-swanson-quotes.herokuapp.com/v2/quotes/search/${data.search}`
    );
  }

  useEffect(() => {
    fetchFirstQuote("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
  }, []);

  useEffect(() => {
    if (response) {
      const random = Math.floor(Math.random() * response.length);
      const randomString = response.filter(
        (quote: string, index: number) => index === random
      )[0];
      setResponseDisplay(randomString);
    }
  }, [response]);

  return (
    <div>
      <form className={`flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className={`px-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring focus:border-blue-500 border border-black-500`}
          placeholder="Enter search term"
          {...register("search")}
        ></input>
        <button className={`px-4 py-2 text-white bg-blue-500 rounded-md`}>
          Submit
        </button>
        <div className={`px-4 py-2 bg-blue-50 text-blue-700 rounded-md`}>
          {responseDisplay ? responseDisplay : firstQuote}
        </div>
      </form>
    </div>
  );
}
