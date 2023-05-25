import { useState } from "react";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // check for error if there is no response at all
      if (!response) {
        throw new Error("could not signup");
      }

      // if there are no errors update  display name of the user
      await updateProfile(auth.currentUser, { displayName });
      setIsPending(false);
      return response.user;
    } catch (error) {
      // error thrown by firebase incase of invalid email/password
      setError(error.message);
      setIsPending(false);
      console.log(error.message);
    }
  };

  return { isPending, error, signup };
}

export default useSignup;
