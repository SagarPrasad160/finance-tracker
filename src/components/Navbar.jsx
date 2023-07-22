import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useLogout } from "../hooks/useLogout";

import { useAuthContext } from "../context/useAuthContext";

import { BiToggleRight } from "react-icons/bi";

import { useContext } from "react";
import TransactionContext from "../context/TransactionsContext";
function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { dispatch } = useContext(TransactionContext);

  const handleClick = () => {
    dispatch({ type: "TOGGLE" });
  };

  const isProfile = (path) => {
    return path === window.location.pathname ? "active" : "normal";
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>financeTracker</li>

        <div className={styles.navlinks}>
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
            <>
              <li>
                Hello,{user.displayName}
                <button className="btn-normal" onClick={logout}>
                  Logout
                </button>
              </li>
              <li>
                <button className="btn-normal" onClick={handleClick}>
                  <BiToggleRight />
                </button>
              </li>
            </>
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
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
