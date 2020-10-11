// Get DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus =document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

//Dummy transactions
const dummyTransactions = [
    { id: 1, description: 'Salary', amount: 100000 },
    { id: 2, description: 'Electric Bill', amount: -50000 },
    { id: 3, description: 'Internet Bill', amount: -10000  },
    { id: 4, description: 'profit', amount: 50000  }
];

let transactions= dummyTransactions;

// Functinon to generate an ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add a new transaction from the form
function addTransaction(e) {
    e.preventDefault();

    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert(`Please enter a valid description and transaction amount.`)
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
        transactions.push(transaction);

        addTransactionUI(transaction);
        updateSums();
    
        description.value = '';
        amount.value = '';  
        
    }
}

//Function to remove a transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

//Function to display Transaction in Transaction History
function addTransactionUI(transaction) {
    //Clissify if income or expanse
    const type = transaction.amount > 0 ? '+' : '-';

    //Creat DOM element for list items
    const item = document.createElement('li');

    //Add class for list item based on type
    item.classList.add( transaction.amount > 0 ? 'plus' : 'minus' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>  
    `;

    list.appendChild(item);
}

//Function to update the balance, income, expanse summaries
function updateSums() {
    //Creat array of transaction amount from transaction array 
    const amounts = transactions.map( transaction => transaction.amount );
    
    //Calaculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => (acc += amount), 0 )
                    .toFixed(2);

    //Calculate total income
    const income = amounts 
                    .filter (amount => amount > 0)
                    .reduce( (acc, amount) => (acc += amount), 0 )
                    .toFixed(2);

    //Calculate total expanse
    const expense = amounts 
                    .filter (amount => amount < 0)
                    .reduce( (acc, amount) => (acc += amount), 0 )
                    .toFixed(2);

    // Update balance in DOM
    balance.innerText = `${total} PKR`

    //Update income in DOm
    money_plus.innerText = `${income} PKR`

    //Update expanse in Dom
    money_minus.innerText = `${expense} PKR`
} 

//Function to initialise th app
function init() {
    list.innerHTML = '';
    
    transactions.forEach(addTransactionUI);
    updateSums();
}

//Event Listeners
//1. event listener on form submit
form.addEventListener('submit', addTransaction);

init();