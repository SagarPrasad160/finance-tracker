import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../context/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const isProfile = (path) => {
    return path === window.location.pathname ? "active" : "normal";
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>financeTracker</li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            Hello,{user.displayName}
            <button className="btn-normal" onClick={logout}>
              Logout
            </button>
          </li>
        )}
        {user && (
          <li>
            {" "}
            <button
              className={`btn-${isProfile("/profile")}`}
              onClick={() => navigate("/profile")}
            >
              {" "}
              Profile
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
