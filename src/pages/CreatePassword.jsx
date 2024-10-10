import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import passwordService from "../services/passwordService";
import UserContext from "../context/UserContext";

export function CreatePassword() {
  const [appName, setAppName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let onCreatePassword = async (e) => {
    e.preventDefault();

    const savedPassword = await passwordService.save(user.uid, {
      appName,
      password,
      userId: user.uid,
    });

    if (savedPassword.status === false) {
      alert(savedPassword.message);
    } else {
      navigate("/passwords");
    }
  };

  return (
    <>
      <Header />

      <div className="grid justify-items-center mt-5">
        <form
          className=" card w-10/12 shadow-xl bg-gray-100"
          onSubmit={onCreatePassword}
        >
          <div className="card-body">
            <div className="card-title mb-2">Save a password</div>
            <div>
              <label
                htmlFor="application-name"
                className="input input-bordered flex items-center"
              >
                Application Name
                <input
                  id="application-name"
                  name="appname"
                  type="text"
                  className="pl-2"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-success">Create Password</button>
          </div>
        </form>
      </div>
    </>
  );
}
