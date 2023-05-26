import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

import { useContext } from "react";
import TransactionContext from "../../context/TransactionsContext";

import TransactionList from "./TransactionList";

function Home() {
  const { transactions } = useContext(TransactionContext);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {transactions && <TransactionList transactions={transactions} />}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm />
        </div>
      </div>
    </>
  );
}
<TransactionForm />;

export default Home;
