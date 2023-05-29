import styles from "./Login.module.css";

import { useState } from "react";

import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
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
        <button className="btn-normal" hidden={isPending}>
          Log In
        </button>
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password
        </p>
        {isPending && (
          <button className="btn-normal" disabled>
            Logging In
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default Login;
