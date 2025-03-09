import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";
import "./Form.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(ThemeContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token_name: "",
  });
  const [loginNotification, setLoginNotification] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoggedIn(true);
    axios
      .post("https://unelmacloud.com/api/v1/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(function (response) {
        if (response.data.status === "success") {
          localStorage.setItem("access_token", response.data.user.access_token);
          navigate("/file-upload");
          setLoginData({
            email: "",
            password: "",
            password_confirmation: "",
            token_name: "",
          });
        } else {
          setLoginNotification(`${response.data.message}`);
          setTimeout(() => {
            setLoginNotification("");
          }, 5_000);
        }
      });
  }

  return (
    <>
      <div className="loginForm Form right-container">
        <div className="header">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                  token_name: e.target.value,
                })
              }
            ></input>
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                  password_confirmation: e.target.value,
                })
              }
            ></input>
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>
      {loginNotification && loginNotification}
    </>
  );
}
