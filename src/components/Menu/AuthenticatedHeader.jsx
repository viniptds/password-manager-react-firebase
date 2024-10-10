import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function AuthenticatedHeader() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <Link to="/create-password" className="btn btn-success mx-2">
        Create new password
      </Link>
      <Link to="/passwords" className="btn btn-info mx-2">
        My Passwords
      </Link>
      <Link to="/my-account" className="btn btn-link mx-2">
        My Account
      </Link>

      <button onClick={handleLogout} className="btn btn-outline">
        Sign Out
      </button>
    </>
  );
}
