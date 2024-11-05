// Initialize transactions from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Handle transaction form submission
document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value); // Ensure amount is a number
    const description = document.getElementById('description').value;

    // Create a transaction object
    const transaction = {
        date,
        category,
        amount,
        description
    };

    // Save transaction to localStorage
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Reset the form
    document.getElementById('transaction-form').reset();

    // Update transaction list and chart
    displayTransactions();
    updateTransactionChart();
});

// Function to display transactions
function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${transaction.date} - ${transaction.category} - $${transaction.amount} - ${transaction.description}`;
        transactionList.appendChild(listItem);
    });
}

// Function to update the transaction chart
function updateTransactionChart() {
    const categoryAmounts = {};

    // Calculate total amounts per category
    transactions.forEach(transaction => {
        if (!categoryAmounts[transaction.category]) {
            categoryAmounts[transaction.category] = 0;
        }
        categoryAmounts[transaction.category] += transaction.amount;
    });

    // Update chart data
    transactionChart.data.labels = Object.keys(categoryAmounts);
    transactionChart.data.datasets[0].data = Object.values(categoryAmounts);
    transactionChart.update();
}

// Display transactions on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTransactions();
    updateTransactionChart();
});

// Budget form handling
document.getElementById('budget-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const category = document.getElementById('budget-category').value;
    const amount = parseFloat(document.getElementById('budget-amount').value); // Ensure amount is a number

    const budget = { category, amount };

    let budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    budgets.push(budget);
    localStorage.setItem('budgets', JSON.stringify(budgets));

    document.getElementById('budget-form').reset();
    displayBudgets();
});

// Function to display budgets
function displayBudgets() {
    const budgetList = document.getElementById('budget-list');
    budgetList.innerHTML = '';

    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    budgets.forEach(budget => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${budget.category} - $${budget.amount}`;
        budgetList.appendChild(listItem);
    });
}

// Display budgets on page load
document.addEventListener('DOMContentLoaded', displayBudgets);

// Savings form handling
document.getElementById('savings-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('goal-name').value;
    const amount = parseFloat(document.getElementById('goal-amount').value); // Ensure amount is a number
    const date = document.getElementById('goal-date').value;

    const goal = { name, amount, date };

    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));

    document.getElementById('savings-form').reset();
    displayGoals();
});

// Function to display savings goals
function displayGoals() {
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = '';

    const goals = JSON.parse(localStorage.getItem('goals ')) || [];
    goals.forEach(goal => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${goal.name} - $${goal.amount} by ${goal.date}`;
        goalList.appendChild(listItem);
    });
}

// Display savings goals on page load
document.addEventListener('DOMContentLoaded', displayGoals);

// Fetch and display financial tips
const apiKey = 'b121c6c0ce9b40e489fcfec7e78de02f';

async function fetchFinancialTips() {
    const url = `https://newsapi.org/v2/everything?q=personal%20finance&language=en&sortBy=relevancy&apiKey=${apiKey}`;
    
    const loadingMessage = document.getElementById('loading-message');
    const noTipsMessage = document.getElementById('no-tips-message');
    const tipsContainer = document.getElementById('financial-tips');
    
    loadingMessage.style.display = 'block';  // Show loading message

    try {
        const response = await fetch(url);
        const data = await response.json();

        loadingMessage.style.display = 'none';  // Hide loading message

        if (data.articles && data.articles.length > 0) {
            displayFinancialTips(data.articles);
        } else {
            noTipsMessage.style.display = 'block';  // Show "no tips" message
        }
    } catch (error) {
        console.error('Error fetching financial tips:', error);
        loadingMessage.style.display = 'none';  // Hide loading message
        noTipsMessage.style.display = 'block';  // Show "no tips" message
    }
}
