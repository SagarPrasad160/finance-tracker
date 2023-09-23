import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

import { useContext, useEffect, useState } from "react";
import TransactionContext from "../../context/TransactionsContext";
import TransactionList from "./TransactionList";

import { convertToCSV } from "../../utils/convertToCSV";
import { downloadExpenses } from "../../utils/downloadExpenses";
import { getRandomColor } from "../../utils/getRandomColor";

function Home() {
  const { transactions } = useContext(TransactionContext);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [],
        backgroundColor: ["#1f9751"],
      },
    ],
  });

  useEffect(() => {
    // Update the data state when transactions change
    setData({
      labels: transactions.map((expense) => expense.date),
      datasets: [
        {
          label: "Monthly Expenses",
          data: transactions.map((expense) => expense.amount),
          // eslint-disable-next-line no-unused-vars
          backgroundColor: transactions.map((_transaction) => getRandomColor()),
        },
      ],
    });
  }, [transactions]);

  const handleClick = () => {
    downloadExpenses(transactions);
  };

  useEffect(() => {
    convertToCSV(transactions);
  }, [transactions]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <BarChart chartData={data} />
        </div>
        <div className={styles.content}>
          <PieChart chartData={data} /> {/* Add the PieChart component */}
        </div>
        <div className={styles.content}>
          {transactions && <TransactionList transactions={transactions} />}
        </div>
        <div className={styles.sidebar}>
          <button id="btn-download" onClick={handleClick}>
            Download CSV
          </button>
          <TransactionForm />
        </div>
      </div>
    </>
  );
}

export default Home;
