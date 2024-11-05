// Initialize transactions from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Initialize budgets and goals
let budgets = JSON.parse(localStorage.getItem('budgets')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Chart contexts
const transactionCtx = document.getElementById('transactionChart').getContext('2d');
const budgetCtx = document.getElementById('budgetChart').getContext('2d');
const savingsCtx = document.getElementById('savingsChart').getContext('2d');
const dashboardCtx = document.getElementById('dashboardChart').getContext('2d');

// Initialize Charts
const transactionChart = new Chart(transactionCtx, {
    type: 'bar',
    data: {
        labels: [], // Categories will be added here
        datasets: [{
            label: 'Transaction Amounts',
            data: [], // Amounts will be added here
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const budgetChart = new Chart(budgetCtx, {
    type: 'bar',
    data: {
        labels: [], // Categories will be added here
        datasets: [{
            label: 'Budget Amounts',
            data: [], // Amounts will be added here
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const savingsChart = new Chart(savingsCtx, {
    type: 'bar',
    data: {
        labels: [], // Goals will be added here
        datasets: [{
            label: 'Savings Goals',
            data: [], // Amounts will be added here
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Initialize Dashboard Chart
const dashboardChart = new Chart(dashboardCtx, {
    type: 'bar',
    data: {
        labels: [], // Categories will be added here
        datasets: [{
            label: 'Total Amounts',
            data: [], // Amounts will be added here
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

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

    // Update transaction list and charts
    displayTransactions();
    updateTransactionChart();
});

// Function to display transactions
function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions .forEach(transaction => {
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

    // Update dashboard chart
    updateDashboardChart();
}

// Handle budget form submission
document.getElementById('budget-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const category = document.getElementById('budget-category').value;
    const amount = parseFloat(document.getElementById('budget-amount').value); // Ensure amount is a number

    const budget = { category, amount };

    budgets.push(budget);
    localStorage.setItem('budgets', JSON.stringify(budgets));

    document.getElementById('budget-form').reset();
    displayBudgets();
    updateBudgetChart();
});

// Function to display budgets
function displayBudgets() {
    const budgetList = document.getElementById('budget-list');
    budgetList.innerHTML = '';

    budgets.forEach(budget => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${budget.category} - $${budget.amount}`;
        budgetList.appendChild(listItem);
    });
}

// Function to update the budget chart
function updateBudgetChart() {
    const categoryAmounts = {};

    // Calculate total amounts per category
    budgets.forEach(budget => {
        if (!categoryAmounts[budget.category]) {
            categoryAmounts[budget.category] = 0;
        }
        categoryAmounts[budget.category] += budget.amount;
    });

    // Update chart data
    budgetChart.data.labels = Object.keys(categoryAmounts);
    budgetChart.data.datasets[0].data = Object.values(categoryAmounts);
    budgetChart.update();

    // Update dashboard chart
    updateDashboardChart();
}

// Handle savings form submission
document.getElementById('savings-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('goal-name').value;
    const amount = parseFloat(document.getElementById('goal-amount').value); // Ensure amount is a number
    const date = document.getElementById('goal-date').value;

    const goal = { name, amount, date };

    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));

    document.getElementById('savings-form').reset();
    displayGoals();
    updateSavingsChart();
});

// Function to display savings goals
function displayGoals() {
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = '';

    goals.forEach(goal => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${goal.name} - $${goal.amount} by ${goal.date}`;
        goalList.appendChild(listItem);
    });
}

// Function to update the savings chart
function updateSavingsChart() {
    const goalAmounts = {};

    // Calculate total amounts per goal
    goals.forEach(goal => {
        goalAmounts[goal.name] = goal.amount; // Assuming each goal has a unique name
    });

    // Update chart data
    savingsChart.data.labels = Object.keys(goalAmounts);
    savingsChart.data.datasets[0].data = Object.values(goalAmounts);
    savingsChart.update();

    // Update dashboard chart
    updateDashboardChart();
}

// Function to update the dashboard chart
function updateDashboardChart() {
    const dashboardData = {};

    // Aggregate transaction amounts
    transactions.forEach(transaction => {
        if (!dashboardData[transaction.category]) {
            dashboardData[transaction.category] = 0;
        }
        dashboardData[transaction.category] += transaction.amount;
    });

    // Aggregate budget amounts
    budgets.forEach(budget => {
        if (!dashboardData[budget.category]) {
            dashboardData[budget.category] = 0;
        }
        dashboardData[budget.category] += budget.amount;
    });

    // Aggregate savings goal amounts
    goals.forEach(goal => {
        dashboardData[goal.name] = (dashboardData[goal.name] || 0) + goal.amount; // Assuming unique names for goals
    });

    // Update dashboard chart data
    dashboardChart.data.labels = Object.keys(dashboardData);
    dashboardChart.data.datasets[0].data = Object.values(dashboardData);
    dashboardChart.update();
}

// Display all data on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTransactions();
    updateTransactionChart();
    displayBudgets();
    updateBudgetChart();
    displayGoals();
    updateSavingsChart();
    updateDashboardChart(); // Initialize dashboard chart on load
});

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

