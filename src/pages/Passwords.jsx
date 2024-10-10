import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";

import passwordService from "../services/passwordService";
import { copyToClipboard } from "../utils/functions";
import UserContext from "../context/UserContext";

export function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    passwordService.list(user.uid).then((dbPasswords) => {
      console.log(dbPasswords);
      setPasswords(dbPasswords);
    });
  }, []);

  const handleCopyToClipboard = (content) => {
    copyToClipboard(content);
    alert("Password copied!");
  };

  const deletePassword = async (id) => {
    await passwordService.delete(id);
    setPasswords(() => passwords.filter((item) => item.id != id));
  };

  const listPasswords = passwords.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.app_name}</td>
        <td>{item.password.split("").map(() => "*")}</td>
        <td>
          <button
            className="btn btn-info mr-2"
            onClick={() => handleCopyToClipboard(item.password)}
          >
            Copy
          </button>
          <input type="hidden" value={item.password} id={"copy-" + item.id} />
          <button
            className="btn btn-error"
            onClick={() => deletePassword(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Header />

      <div className="grid justify-items-center mt-4">
        <div className="overflow-x-auto w-8/12">
          <table className="table">
            <thead>
              <tr>
                <th>App Name</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{listPasswords}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
