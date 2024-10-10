import { Link } from "react-router-dom";

export default function UnauthenticatedHeader() {
  return (
    <>
      <Link to="/login" className="pr-3">
        Sign In
      </Link>
      <Link to="/signup" className="btn btn-success">
        Sign Up
      </Link>
    </>
  );
}
