const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//List of songs
const songList = ['Beatit', 'Dangerous', 'Who is it'];

// Track which song is currently playing
let currentSong = 1;

//Update th song to the DOM
 function loadSong(song) {
     title.innerText = song;
     audio.src = `music/${song}.mp3`;
     cover.src = `images/${song}.jpeg`;
}


// function to play the song
function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

// function to pause the song
function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa=pause');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//Function to swithch to previous song
function prevSong() {
    currentSong--;

    if (currentSong < 0 ) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);

    playSong();
}

//Function to swithch to next song
function nextSong() {
    currentSong++;

    if (currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);

    playSong();
}

// Update the progress bar
function updateProgress(e) {
    const {currentTime, duration} = e.srcElement;
    const progerssPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progerssPercentage}%`
}


//Initial song load
loadSong(songList[currentSong]);

//Event listener
// 1. play button event listener
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// set thye progress  bar
function setProgress(e) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
    console.log(offsetX, width);
}

// 2. Previous button event listener
prevButton.addEventListener('click', prevSong);

// 3. Next button event listener
nextButton.addEventListener('click', nextSong);


// 4. Update the time for song play
audio.addEventListener('timeupdate', updateProgress);

// 5. update the time for song play based on click on progress container
progressContainer.addEventListener('click', setProgress);

// 6. Automatically pay next song
audio.addEventListener('ended', nextSong);