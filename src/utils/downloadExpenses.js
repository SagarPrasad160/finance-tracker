// Function to download expenses as a CSV file

import { convertToCSV } from "./convertToCSV";

export function downloadExpenses(transactions) {
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
