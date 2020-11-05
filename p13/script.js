// Get All DOM elements for functionality
//Cards Container
const cardContainer = document.getElementById('card-container');
//Navigation
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
//Add Crad Container 
const addCardContainer = document.getElementById('add-card-container');
const addCardBtn = document.getElementById('add-card');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addNewCardBtn = document.getElementById('add-card-btn')
//Clear cards
const clearBtn = document.getElementById('clear-btn');

//Track current card 
let currentActiveCard = 0;

//Collection if cards DOM elements
const cardElements = [];


//Collection of card data
const cardsData = getCardsData();

//Functions
// 1. Functions to create all cards
function createCards() {
    cardsData.forEach( (data, index) => createCard(data, index) );
}

// 2. Function to create a card
function createCard(data, index) {
    //Create the div for the card
    const card = document.createElement('div');
    // Assing the card class
    card.classList.add('card');
    // Check for first card and assing active class
    if (index === 0) {
        card.classList.add('active');
    }
    //Creat the innerHTML for a card
    card.innerHTML = `
        <div class="inner-card">
            <div class="card-front">
                <p>${data.question}</p>
            </div>
            <div class="card-back">
                <p>${data.answer}</p>
            </div>
        </div> 
    `; 
    //Evemt listener to flip the card on click
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add the newly created card to the collection of card DOM elements
    cardElements.push(card);
    //Add the card to the DOM
    cardContainer.appendChild(card);
    // Display the current card/ total card value
    updateCurrentCardText();
}

//3.Function to show the current card / total number of cards in navigation
function updateCurrentCardText() {
    currentCard.innerHTML = `<p>${currentActiveCard +1}/${cardElements.length}</p>`
}

// 4. Function to get card data from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
} 

// Function to save data to local storage
function saveCardData(cards) {
    // Svae cards data to local storage
    localStorage.setItem('cards', JSON.stringify(cards));
    // Reload Window
    window.location.reload();
}

createCards();

// Event listeners 
// 1.Event listener for next button
nextBtn.addEventListener('click', () => {
    //Hide the current card and move to left
    cardElements[currentActiveCard].className = 'card left'
    //Increment the current active card tracker to next card
    currentActiveCard++;
    //Check if the current card is the last card
    if ( currentActiveCard > cardElements.length -1 ) {
        currentActiveCard = cardElements.length -1;
    }
    //Display the new card
    cardElements[currentActiveCard].className = 'card active'
    //Update the current card number
    updateCurrentCardText();

})


//2.Event listener for previous button
prevBtn.addEventListener('click', () => {
    //Hide the current card and move to right
    cardElements[currentActiveCard].className = 'card right'
    //Increment the current active card tracker to next card
    currentActiveCard--;
    //Check if the current card is the last card
    if ( currentActiveCard < 0  ) {
        currentActiveCard = 0;
    }
    //Display the new card
    cardElements[currentActiveCard].className = 'card active'
    //Update the current card number
    updateCurrentCardText();

})

// Creat event listener on add new card button
addCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show');
})

//4. Close the add new card form
closeCardBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('show'); 
})


// Eventlistener on creating a new card
addNewCardBtn.addEventListener('click', () => {
    // Get the user input from the text fields
    const questionInput = question.value;
    const answerInput = answer.value;
    // Check to make sure input are not null
    if ( questionInput.trim() && answerInput.trim() ) {
        // Creat a new object using th user inputs
        const newCard = { question: questionInput, answer: answerInput }
        //Using the new card object, creat a card element using the create card function
        createCard(newCard);

        // Reset form fields
        question.value = '';
        answer.value = '';
        // Hide form after submit
        addCardContainer.classList.remove('show');
        // Add the new card object to the card data array
        cardsData.push(newCard);
        // Save data to local storage and reload page
        saveCardData(cardsData);
    }
})

// Eventlistener to clear all cards
clearBtn.addEventListener('click', () => {
    // Removing data form local storage
    localStorage.clear();
    cardContainer.innerHTML = '';
    // Reload the window
    window.location.reload();
    // Update the current card number
    currentCard.innerHTML = `<p></p>`
})