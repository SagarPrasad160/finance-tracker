import PropTypes from "prop-types";
import styles from "./Home.module.css";

import { useContext } from "react";
import TransactionContext from "../../context/TransactionsContext";
function TransactionList({ transactions }) {
  const { removeTransaction } = useContext(TransactionContext);
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className={styles.name}>{transaction.name}</p>
            <p className={styles.amount}>${transaction.amount}</p>
            <button onClick={() => removeTransaction(transaction.id)}>X</button>
          </li>
        );
      })}
    </ul>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TransactionList;
