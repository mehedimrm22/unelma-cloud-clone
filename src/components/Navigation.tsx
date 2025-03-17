import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeContext } from "../context";
import logo from "../../public/logo.svg";
import "./Navigation.css";

export default function Navigation() {
  const { loggedIn, setLoggedIn } = useContext(ThemeContext);

  // Check for token whenever the component renders
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token");
      setLoggedIn(!!token); // Update state based on token presence
    };

    checkToken(); // Run check initially

    // Listen for localStorage changes (Login/Logout)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [setLoggedIn]); // Depend on `setLoggedIn` to avoid unnecessary re-renders

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token
    setLoggedIn(false); // Update UI
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link className="sidebar-logo" to="all-uploads">
            <img src={logo} alt="File Uploader - noobDev" />
          </Link>
        </div>

        <div className="sidebar-links">
          <button>
            <Link
              to="register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Register
            </Link>
          </button>
          
          {loggedIn ? (
            <button onClick={handleLogout}>
              <Link
                to="home"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Log out
              </Link>
            </button>
          ) : (
            <button>
              <Link
                to="login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Log in
              </Link>
            </button>
          )}

          <button>
            <Link
              to="file-upload"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Upload
            </Link>
          </button>
          <button>
            <Link
              to="all-uploads"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              All uploads
            </Link>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="copyright-text">
            <p>Copyright © 2025 | noobDev</p>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
