import { createContext, useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";

const toggleReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOGGLE":
      return {
        toggle: true,
      };
    case "REMOVE_TOGGLE":
      return {
        toggle: false,
      };
    case "TOGGLE":
      return {
        toggle: !state.toggle,
      };
    default:
      return state;
  }
};

const TransactionContext = createContext();
import { useAuthContext } from "./useAuthContext";

import { db } from "../firebase/config";
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [isEdit, setIsEdit] = useState({
    edit: false,
    transaction: null,
  });

  const initialState = {
    toggle: false,
  };
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  useEffect(() => {
    const expenseTotal = transactions.reduce((acc, curr) => {
      return acc + parseInt(curr.amount);
    }, 0);
    if (expenseTotal > 1000) {
      dispatch({ type: "SET_TOGGLE" });
    } else {
      dispatch({ type: "REMOVE_TOGGLE" });
    }
  }, [transactions]);

  useEffect(() => {
    if (document.querySelector("body").classList.contains("toggle")) {
      document.querySelector("body").classList.remove("toggle");
    } else {
      document.querySelector("body").classList.add("toggle");
    }
  }, [state.toggle]);

  const { user } = useAuthContext();

  const handleEdit = (transaction) => {
    setIsEdit({
      ...isEdit,
      edit: true,
      transaction,
    });
  };

  useEffect(() => {
    let ref;
    ref = collection(db, "transactions");

    if (user) {
      ref = query(ref, where("uid", "==", user.uid));

      onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(results);
      });
    }
  }, [user]);

  const addTransaction = async (transaction) => {
    const ref = collection(db, "transactions");
    await addDoc(ref, {
      name: transaction.name,
      amount: transaction.amount,
      uid: user.uid,
    });
  };

  const removeTransaction = async (id) => {
    const ref = doc(db, "transactions", id);
    await deleteDoc(ref);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        handleEdit,
        isEdit,
        state,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TransactionContext;
