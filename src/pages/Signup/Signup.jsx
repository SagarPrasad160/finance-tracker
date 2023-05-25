import styles from "./Signup.module.css";

import { useState } from "react";

import useSignup from "../../hooks/useSignup";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, error, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const user = await signup(email, password, name);
    console.log(user);

    // reset form data
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <span>email:</span>
        <input
          type="email"
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
        Sign In
      </button>
      {isPending && (
        <button className="btn" disabled>
          Signing Up...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup;
