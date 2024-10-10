import { useContext } from "react";
import Header from "../components/Header";
import UserContext from "../context/UserContext";
import accountService from "../services/accountService";

export function MyAccount() {
  const { user } = useContext(UserContext);
  const userData = accountService.accountInfo(user);

  return (
    <>
      <Header />

      <div className="grid justify-items-center mt-4">
        <div className="overflow-x-auto w-8/12">
          <p>ID: {user.uid}</p>
          <p>Email: {user.email}</p>
          <p>Last Login at: {userData.lastLogin}</p>
          <p>Created at: {userData.createdAt}</p>
        </div>
      </div>
    </>
  );
}
