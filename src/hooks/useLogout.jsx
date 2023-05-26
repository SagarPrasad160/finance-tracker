import { useEffect, useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      // signs out user
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      // update state
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      console.log(error.message);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    // update isCancelled state when the component unmounts
    return () => setIsCancelled(true);
  }, []);

  return { logout, isPending, error };
};
