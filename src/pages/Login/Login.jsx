import styles from "./Login.module.css";

import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn">Log In</button>
    </form>
  );
}

export default Login;
