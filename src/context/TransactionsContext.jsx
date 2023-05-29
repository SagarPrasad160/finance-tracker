import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
      console.log("user");

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
