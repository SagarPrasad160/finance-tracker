// Function to convert expenses data to CSV format
export function convertToCSV(expenses) {
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
