import { useContext } from "react";

import AuthenticatedHeader from "./Menu/AuthenticatedHeader";
import UnauthenticatedHeader from "./Menu/UnauthenticatedHeader";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Header() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <div className="navbar flex justify-between space-x-2 bg-gray-300">
      <Link to="/" className="px-4 basis-1/4 font-bold">
        Password Manager
      </Link>
      <div className="text-right px-4">
        {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      </div>
    </div>
  );
}

export default Header;
