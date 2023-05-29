import { useState, useContext, useEffect } from "react";

import TransactionContext from "../../context/TransactionsContext";

function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction, isEdit, removeTransaction } =
    useContext(TransactionContext);

  useEffect(() => {
    // update the transaction form if transaction is in edit mode
    if (isEdit.edit) {
      setName(isEdit.transaction.name);
      setAmount(isEdit.transaction.amount);
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if transaction is being edit remove the existing one from firestore to add the updated one
    if (isEdit.edit) {
      removeTransaction(isEdit.transaction.id);
    }

    addTransaction({ name, amount });

    // reset form
    setName("");
    setAmount("");
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Amount ($) :</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button>Add transaction</button>
      </form>
    </>
  );
}

export default TransactionForm;
