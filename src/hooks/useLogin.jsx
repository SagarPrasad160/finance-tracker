import { useState } from "react";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../context/useAuthContext";

function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // check for error if there is no response at all
      if (!response) {
        throw new Error("could not signup");
      }
      // dispatch action to  update the user in AuthContext
      dispatch({ type: "LOGIN", payload: response.user });

      // update state

      setIsPending(false);
    } catch (error) {
      // error thrown by firebase incase of invalid email/password
      console.log(error.message);

      setIsPending(false);
      setError(error.message);
    }
  };

  return { isPending, error, login };
}

export default useLogin;
