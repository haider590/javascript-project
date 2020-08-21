const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const screen = document.querySelector('.screen');
let ticketPrice = +movieSelect.value;

populateUI()

//Pull data for local storage to build ui 
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach( (seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//function to update counts

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const countSelectedSeats = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    count.innerText = countSelectedSeats;
    total.innerText = ticketPrice * countSelectedSeats;
}

//function to save the selected movie and its price

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Event listener for change on Select Movie dropdown

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Event listener for click on available seats
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
}) 

//calculate initial number of seats and total price
updateSelectedCount();



// for movie trailer
const trailerLink = ['https://www.youtube.com/embed/alQlJDRnQkE','https://www.youtube.com/embed/ICE1tPVFkhA','https://www.youtube.com/embed/CI4EjV_x_PQ','https://www.youtube.com/embed/OuXkXJ1fPuk','https://www.youtube.com/embed/t86sKsR4pnk'];


//function to play movie trailer 

function playTrailer(index) {
    screen.innerHTML = `<iframe width='350' height='800' src='${trailerLink[index]}?autoplay=1&loop=1&controls=0' frameborder='3' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'></iframe>`;
}


// event listener for changing the trailer as movie is changed
movie.addEventListener('change',(event)=>{
    localStorage.setItem('movieIndex',event.target.selectedIndex);
    playTrailer( localStorage.getItem('movieIndex') );
    localStorage.setItem('movieIndex',JSON.parse(movie.selectedIndex));
    displayResult(JSON.stringify(selectedSeats.length),JSON.stringify(selectedSeats.length * movie[localStorage.getItem('movieIndex')].value));
});


// calling function to Load trailer
playTrailer((localStorage.getItem('movieIndex') != null)? localStorage.getItem('movieIndex') : 0);