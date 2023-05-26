import styles from "./Login.module.css";

import { useState } from "react";

import useLogin from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);

    // reset form
    setEmail("");
    setPassword("");
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
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
      <button className="btn" hidden={isPending}>
        Log In
      </button>
      {isPending && (
        <button className="btn" disabled>
          Logging In
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
