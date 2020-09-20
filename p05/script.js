// getting Dom Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');

//Initialization Data Array
let data = [];

// Creat Initial Users
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to Fetch Random Userfrom API
// API randomuser.me/api
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
 
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random()*1000000) 
    }; 

        addData(newUser);
}

// Function to double the net worth of each user
function doubleWorth() {
    data = data.map( item => {
        return { ...item, worth: item.worth*2 }
    });

    updateDom();
}

// Function to sort the user by Richest
function sortRichest() {
    data.sort( (a, b) => b.worth - a.worth );

    updateDom();
}

// Function to filter the users and only show Millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000 
    );

    updateDom();
}

// Function to calculate the totla net eorth of all users
function calculateTotalNetWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;

    main.appendChild(totalNetWorthElement);
}

// Add Newly Generated User into the Data Array
function addData(newUser) {
    data.push(newUser);

    updateDom();
}


//Function to Update the UI with DOM
function updateDom(inputData = data){
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>'

    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });
} 


//Function to format number as Currency
function formatCurrency(num){
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 

//Event Listeners
// 1. Add user event listener
addUserButton.addEventListener('click', generateRandomUser);

// 2. Add double money event listener
doubleMoneyButton.addEventListener('click', doubleWorth);

// 3. Add sort event listener
sortButton.addEventListener('click', sortRichest);

// 4. Add show millioaires event listener
showMillionairesButton.addEventListener('click', showMillionaires);

// 5. Add calculatye total wealth event listener
totalButton.addEventListener('click', calculateTotalNetWorth);