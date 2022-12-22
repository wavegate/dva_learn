import Counter from "../../features/practice/Counter";
import Palindrome from "../../features/practice/Palindrome";
import Form from "../../features/practice/Form";
import Address from "../../features/practice/Address";
import Posts from "../../features/practice/Posts";
import DOB from "../../features/practice/DOB";
import Swanson from "../../features/practice/Swanson";
import Clock from "../../features/practice/Clock";
import Convert from "../../features/practice/Convert";
import UsersList from "../../features/practice/UsersList";

export default function Practice() {
  return (
    <div
      className={`container mx-auto mt-12 flex flex-col gap-12 [&>div]:border [&>div]:p-4 mb-12`}
    >
      {/* <Counter />
      <Palindrome />
      <Form />
      <Address />
      <Posts /> */}
      <DOB />
      <Swanson />
      <Clock />
      <Convert />
      <UsersList />
    </div>
  );
}
