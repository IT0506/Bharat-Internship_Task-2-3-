let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const savingsDisplay = document.getElementById('savings');

const totalIncome = 1200000; // Assuming total income is constant

function updateSavings() {
    let totalExpenses = 0;
    expenses.forEach(expense => {
        totalExpenses += expense.amount;
    });
    const savings = totalIncome - totalExpenses;
    savingsDisplay.textContent = savings.toFixed(2);
}

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (date === '') {
        alert('Please select a date.');
        return;
    }

    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function () {
        const index = expenses.findIndex(expense => expense.row === newRow);
        const deletedExpense = expenses.splice(index, 1)[0];
        totalAmount -= deletedExpense.amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);
        expenseTableBody.removeChild(newRow);
        updateSavings();
    });

    const expense = {
        category,
        amount,
        date,
        row: newRow
    };

    expenses.push(expense);

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount.toFixed(2);

    updateSavings();
});

