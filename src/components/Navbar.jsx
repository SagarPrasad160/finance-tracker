import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../context/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const navigate = useNavigate();
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
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
        {user && (
          <li>
            {" "}
            <button className="btn" onClick={() => navigate("/profile")}>
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
