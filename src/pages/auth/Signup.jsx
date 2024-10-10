import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import authService, { firebaseAuthMessages } from "../../utils/firebaseAuth";
import Header from "../../components/Header";
import UserContext from "../../context/UserContext";

export function Signup() {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(UserContext);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords must match");
      return;
    }

    await authService
      .signUp(signUpData.email, signUpData.password)
      .then(() => {
        navigate("/login");
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
          onSubmit={onSubmit}
        >
          <div className="card-body">
            <div className="card-title mb-2">Register now</div>
            <div>
              <label
                htmlFor="email-address"
                className="input input-bordered flex items-center"
              >
                Email address
                <input
                  type="email"
                  value={signUpData.email}
                  className="pl-2"
                  onChange={(e) =>
                    setSignUpData((prev) => {
                      return {
                        ...prev,
                        email: e.target.value,
                      };
                    })
                  }
                  required
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
                  type="password"
                  value={signUpData.password}
                  className="pl-2"
                  onChange={(e) =>
                    setSignUpData((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    })
                  }
                  required
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="password"
                className="input input-bordered flex items-center"
              >
                Confirm Password
                <input
                  type="password"
                  value={signUpData.confirmPassword}
                  className="pl-2"
                  onChange={(e) =>
                    setSignUpData((prev) => {
                      return {
                        ...prev,
                        confirmPassword: e.target.value,
                      };
                    })
                  }
                  required
                />
              </label>
            </div>

            <button type="submit" className="btn btn-success">
              Sign up
            </button>

            <p className="">
              Already have an account?{" "}
              <NavLink to="/login" className="link">
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
