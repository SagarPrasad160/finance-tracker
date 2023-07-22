import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";

import { useContext, useEffect } from "react";
import TransactionContext from "../../context/TransactionsContext";

import TransactionList from "./TransactionList";

function Home() {
  const { transactions } = useContext(TransactionContext);

  // Function to convert expenses data to CSV format
  function convertToCSV(expenses) {
    if (!expenses || expenses.length === 0) {
      return ""; // Return empty string if expenses is null, undefined, or empty
    }

    const csvRows = [];

    // Add headers to CSV
    const headers = Object.keys(expenses[0]);
    csvRows.push(headers.join(","));

    // Add expense data to CSV
    expenses.forEach((expense) => {
      const values = headers.map((header) => {
        const escapedValue = expense[header].toString().replace(/"/g, '\\"');
        return `"${escapedValue}"`;
      });
      csvRows.push(values.join(","));
    });

    // Join rows with newline character
    return csvRows.join("\n");
  }

  // Function to download expenses as a CSV file
  function downloadExpenses() {
    const csvContent = convertToCSV(transactions);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Generate a download URL
    const downloadUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "expenses.csv";
    link.style.display = "none";

    // Append the link element to the document body
    document.body.appendChild(link);

    // Click the link to trigger the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  }

  useEffect(() => {
    convertToCSV(transactions);
  }, [transactions]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          {transactions && <TransactionList transactions={transactions} />}
        </div>
        <div className={styles.sidebar}>
          <button id="btn-download" onClick={downloadExpenses}>
            Download
          </button>
          <TransactionForm />
        </div>
      </div>
    </>
  );
}

export default Home;
