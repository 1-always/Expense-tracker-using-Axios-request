// Retrieve existing expenses from local storage or initialize an empty arra

//let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let expenses = [];
function getExpenses(){
axios.get("https://jsonplaceholder.typicode.com/todos")
.then((res)=>{
expenses=res.data
updateExpenseList();
})
.catch((error) => {
  console.log("Error fetching expenses:", error);
});
}
// Function to add an expense
function addExpense() {
  // Get expense details from the form
  const expenseDate = document.getElementById('expense-date').value;
  const expenseCategory = document.getElementById('expense-category').value;
  const expenseAmount = document.getElementById('expense-amount').value;
  const expenseDescription = document.getElementById('expense-description').value;

  // Create a new expense object
  const newExpense = {
    id: Date.now(), // Generate a unique ID for the expense
    date: expenseDate,
    category: expenseCategory,
    amount: expenseAmount,
    description: expenseDescription
  };

  // Add the new expense to the expenses array

  // Save the updated expenses array to local storage
  //localStorage.setItem('expenses', JSON.stringify(expenses));
  axios.post("https://jsonplaceholder.typicode.com/todos" , newExpense)

  .then((res)=>{
    expenses.push(res.data)
    updateExpenseList()
    document.getElementById('expense-date').value = '';
  document.getElementById('expense-category').value = '';
  document.getElementById('expense-amount').value = '';
  document.getElementById('expense-description').value = '';
    //updateExpenseList(res)
  })
  .catch((err)=>{
    if(err.status=== 500){
      expenses.push(res.data)
      updateExpenseList()
      document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').value = '';
    }

  })
  // Clear the form fields
  // document.getElementById('expense-date').value = '';
  // document.getElementById('expense-category').value = '';
  // document.getElementById('expense-amount').value = '';
  // document.getElementById('expense-description').value = '';

  // Update the expense list display

}

// Function to update the expense list display
function updateExpenseList() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const expenseItem = document.createElement('li');
    expenseItem.innerHTML = `
      <div>Date: ${expense.date}</div>
      <div>Category: ${expense.category}</div>
      <div>Amount: ${expense.amount}</div>
      <div>Description: ${expense.description}</div>
      <button onclick="editExpense(${expense.id})">Edit</button>
      <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

// Function to edit an expense
function editExpense(expenseId) {
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);

  if (expenseIndex !== -1) {
    const expense = expenses[expenseIndex];

    // Populate the form with the expense details
    document.getElementById('expense-date').value = expense.date;
    document.getElementById('expense-category').value = expense.category;
    document.getElementById('expense-amount').value = expense.amount;
    document.getElementById('expense-description').value = expense.description;

    // Change the add button to an update button
    const addButton = document.getElementById('add-button');
    addButton.innerText = 'Update Expense';
    addButton.onclick = function () {
      updateExpense(expenseId);
    };
  }
}

// Function to update an expense
function updateExpense(expenseId) {
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);

  if (expenseIndex !== -1) {
    const updatedExpense = {
      id: expenseId,
      date: document.getElementById('expense-date').value,
      category: document.getElementById('expense-category').value,
      amount: document.getElementById('expense-amount').value,
      description: document.getElementById('expense-description').value
    };

    // Update the expense in the expenses array
    expenses[expenseIndex] = updatedExpense;

    // Save the updated expenses array to local storage
    //localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the form fields
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').value = '';

       // Change the update button back to an add button
    const addButton = document.getElementById('add-button');
    addButton.innerText = 'Add Expense';
    addButton.onclick = addExpense;

    // Update the expense list display
    updateExpenseList();
  }
}

// Function to delete an expense
function deleteExpense(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);

  // Save the updated expenses array to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Update the expense list display
  updateExpenseList();
}

// Display the initial expense list
updateExpenseList();
getExpenses();

