import { useState, useContext, useEffect } from "react";

import TransactionContext from "../../context/TransactionsContext";

function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

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

    addTransaction({ name, amount, date });

    // reset form
    setName("");
    setAmount("");
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

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
        <label>
          <span>Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min="2016-12-10" // Minimum date
            max={today} // Maximum date
          />
        </label>
        <button>Add transaction</button>
      </form>
    </>
  );
}

export default TransactionForm;
