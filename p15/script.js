//Get DOM elements 
// Get the search form
const form = document.getElementById('form');
//Get the input text field
const search = document.getElementById('search');
//Get the results container
const results = document.getElementById('results');
//Get the pagination container
const pagination = document.getElementById('pagination');

// Base url for api fetch
const api = `https://api.lyrics.ovh`;

//Functions
//1. Function to search song title and artist
async function searchSongs(term) {
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();

    showData(data);
} 

//Function to display data from search in the dom
function showData(data) {
    //Display the first set songs in the DOM  
    results.innerHTML = `
        <ul class="songs">
            ${data.data.map( 
                    song => `
                        <li>
                            <span>${song.artist.name} - ${song.title}</span>
                            <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyircs</button>
                        </li>
                    `
                ).join('')
            }
        </ul>
    `;
    //Add pagination if required
    if (data.prev || data.next) {
        pagination.innerHTML = `
            ${data.prev ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`:``}
            ${data.next ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`:``}
        `;
    } else {
        pagination.innerHTML = '';
    }
}

//3. Function to get the prev or next song from api
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

//4. Function to get the lyrics of a song
async function getLyrics(artist, title) {
    const res = await fetch(`${api}/v1/${artist}/${title}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'</br>');
    results.innerHTML = `
        <h2>${artist}-${title}</h2>
        <p>${lyrics}</p>
    `;

    pagination.innerHTML = '';

}


//Event listeners
// 1. Event listener for search form
form.addEventListener('submit', e => {
    //Prevent the reloading of the page on submit
    e.preventDefault();
    //Get the search term from the input
    const searchTerm = search.value.trim();
    //Check if search term is valid
    if (searchTerm) {
        searchSongs(searchTerm); 
    } else {
        alert('please enter a valid search')
    }
})

//Event listner to get lyrics to a song on click of button
results.addEventListener('click', e => {
    //Find what was clicked
    const clickedElement = e.target;
    //check if clicked element is a button
    if (clickedElement.tagName === 'BUTTON' ) {
        //Get artist name and song title from HTML 5 custom properties on button
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-title');
        //Now fetch the lyrics
        getLyrics(artist, title);
    }
})