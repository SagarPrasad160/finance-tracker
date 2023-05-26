import { useAuthContext } from "../../context/useAuthContext";
import { useState } from "react";

import styles from "./Profile.module.css";

import { auth } from "../../firebase/config";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

function Profile() {
  const { user } = useAuthContext();

  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      if (password !== "") {
        await updatePassword(auth.currentUser, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles["profile-form"]} onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          placeholder="enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>Current Password</span>
        <input
          type="password"
          placeholder="enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </label>
      <button className="btn">update</button>
    </form>
  );
}

export default Profile;
