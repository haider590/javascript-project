// Get all DOM elements required
// HTML5 Main element for the grid
const main = document.getElementById('main');
// Select box for changeing voices
const voiceSelect = document.getElementById('voices');
// Toggle button to display custom text input
const toggleBtn = document.getElementById('toggle');
// Button to close the custom text div
const closeBtn = document.getElementById('close');
//Text area for custom text input
const customText = document.getElementById('text');
// button to read the custom text'I am angry'
const readBtn = document.getElementById('read');
//Custom text div
const customTextDiv = document.getElementById('custom-text');

// Array for holding all images and text to be read
const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpeg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/grandma.jpeg',
        text: "I want to go to Grandma's"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/home.jpeg',
        text: "I Want to go Home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I Want to go Outside"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpeg',
        text: "I'm Scared"
    },
    {
        image: './img/school.jpeg',
        text: "I Want to go to School"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    }
]

// Array for all web speech api
let voicesBackup = [];

//Create a box for each object in the data array
data.forEach(createBox);

//Functions
// 1. function to create speech boxes
function createBox(imageObj) { 
    //Creat empty div for the image to be added in the main grid later
    const box = document.createElement('div');
    //Get the image url and text from image from the data array
    const { image, text } = imageObj;
    // Apply a css class to the new div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    //Add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    // Add the new box to the DOM
    main.appendChild(box);
}


//Initialise speech synthesis
const message = new SpeechSynthesisUtterance();

// 2. Function to get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }


// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

//5. Function to set the new voice
function setVoice(e) {
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
} 

//Execute populate voice list function
  populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event Listener
// 1 Toggle button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

//Close button and custom text div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

//Event listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

//Eventlistener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})