import styles from "./ForgotPassword.module.css";

import { useState } from "react";

import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Reset mail sent!");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };
  return (
    <form className={styles["forgot-password-form"]}>
      <label>
        <span>Email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-normal" onClick={handleClick}>
          Send Reset Email
        </button>
      </label>
    </form>
  );
}

export default ForgotPassword;
