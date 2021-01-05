// All DOM Elements
const container = document.getElementById('list-container');
const checkOrderButton = document.getElementById('check-btn');
const resetBackButton = document.getElementById('reset-btn');
// Arrays
const sortedCountries = ['Russia','Canada','United States','China','Brazil','Australia','India','Argentina','Kazakhstan','Algeria'];
let unsorted = shuffle(sortedCountries);
// Variables
let draggedElementIndex = -1;
let droppedElementIndex = -1;

// All Functions
// 1 - function to update container by list
function updateContainer(inputArray) {
    // clearing existing elemnts in the container
    container.innerHTML = '';
    // loo of input Array to get country names
    inputArray.forEach((country,index) => {
        // 1 - list element
        const element = document.createElement('li');
        // 2 - adding class to the list element
        element.classList.add('list-item');
        // 3 - required html
        element.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable${country === sortedCountries[index] ? " success" : " error"}" draggable="true">
            <p>${country}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        // 4 - draggable element in the list element
        const draggable = element.querySelector('.draggable');
        // 5 - event listeners for draggable
        draggable.addEventListener('dragstart' , dragStart);
        draggable.addEventListener('dragend' , dragEnd);
        draggable.addEventListener('dragenter' , dragEnter);
        draggable.addEventListener('dragover' , dragOver);
        draggable.addEventListener('dragleave' , dragLeave);
        draggable.addEventListener('drop' , drop);
        // 6 - add the list element 
        container.appendChild(element);
    })
}

// 2 - returning shuffled elements of an array 
function shuffle(inputArray) {
    // result array
    const shuffledArray = [];
    // input to result array
    inputArray.forEach(country=>{
        // country on different indexes
        let newIndex = Math.floor(Math.random() * sortedCountries.length);
        while(shuffledArray[newIndex] != null){
            newIndex = Math.floor(Math.random() * sortedCountries.length);
        }
        shuffledArray[newIndex] = country;
    })
    // return result array
    return shuffledArray;
}

// 3 - while dragging
function dragStart(e) {
    // if list-item is available in the path
    e.path.forEach((element, index) => {
        if(index < e.path.length - 2 && element.classList.contains('list-item')){// avoiding 'document' and 'Window'
            // present location of the country
            draggedElementIndex = (+element.querySelector('.number').innerText -1);
        }
    })
}

// 4 - when dragging is ended
function dragEnd(e) {
    e.preventDefault();
}

// 5 - landed on the element while dragging
function dragEnter(e) {
    e.preventDefault();
}

// 6 - moving on an element while dragging
function dragOver(e) {
    e.preventDefault();
    this.style.opacity = '0.5';
}

// 7 - left dragging
function dragLeave(e) {
    e.preventDefault();
    this.style.opacity = '1';
}

// 8 - when dropped
function drop(e) {
    e.preventDefault();
    this.style.opacity = '1';
    // find if list-item is available in the path
    e.path.forEach((element, index) => {
        if(index < e.path.length - 2 && element.classList.contains('list-item')){// avoiding 'document' and 'Window'
            // get index (present location) of the country
            droppedElementIndex = (+element.querySelector('.number').innerText -1);
            // swap both countries in unsorted ARRAY
            swap(draggedElementIndex,droppedElementIndex,unsorted);
            // update the DOM using UPDATED unsorted
            updateContainer(unsorted);
        }
    })
}

// 9 - function to swap array
function swap(index1, index2, array) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

// event listener for buttons
// 1 - event listener for check button
checkOrderButton.addEventListener('click', e => {
    updateContainer(sortedCountries);
    container.querySelectorAll('.draggable').forEach(draggable => draggable.classList.add('success'));
})
// 2 - Event listener for reset back button
resetBackButton.addEventListener('click', updateContainer.bind(null,unsorted));

// function to update dom
updateContainer(unsorted);