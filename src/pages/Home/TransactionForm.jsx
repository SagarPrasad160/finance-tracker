import { useState, useContext } from "react";

import TransactionContext from "../../context/TransactionsContext";

function TransactionForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
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
