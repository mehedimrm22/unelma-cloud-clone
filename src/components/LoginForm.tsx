import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";

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
      <div className="loginForm right-container">
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Log in</button>
        </form>
      </div>
      {loginNotification && loginNotification}
    </>
  );
}
