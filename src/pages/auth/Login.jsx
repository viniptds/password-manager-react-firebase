import { useContext, useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Header from "../../components/Header";
import { firebaseAuthMessages } from "../../utils/firebaseAuth";

export function Login() {
  const { login, isAuthenticated } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();

    login(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;

        if (firebaseAuthMessages[errorCode] !== undefined) {
          errorMessage = firebaseAuthMessages[errorCode];
        }

        alert(errorMessage);

        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <Header />

      <div className="grid justify-items-center mt-5">
        <form
          className=" card w-10/12 shadow-xl bg-gray-100"
          onSubmit={onLogin}
        >
          <div className="card-body">
            <div className="card-title mb-2">Log into your account</div>
            <div>
              <label
                htmlFor="email-address"
                className="input input-bordered flex items-center"
              >
                Email address
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  className="pl-2"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="password"
                className="input input-bordered flex items-center"
              >
                Password
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="pl-2 "
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-success">Login</button>
            <p className="">
              No account yet?{" "}
              <NavLink to="/signup" className="link">
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
