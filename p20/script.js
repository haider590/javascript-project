let loc = document.getElementById('location');
let tempicon = document.getElementById('temp-icon');
let tempvalue = document.getElementById('temp-value');
let climate = document.getElementById('climate');
let iconfile;
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');








// 1. Coad for featching weather of our current location
window.addEventListener('load', () => {
    let long;
    let lat;
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>
        {


        long = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3eb6eccdc6bca20ca1bf3f391c452885`
        fetch(api).then((response)=>{
            return response.json();
        })

        .then (data =>
            {
                const {name} = data;
                const {feels_like} = data.main;
                const {id,main} = data.weather[0];

                loc.textContent = name;
       
                climate.textContent = main;
                tempvalue.textContent = Math.round(feels_like - 273);
                if (id<300 && id>200)
                {
                    tempicon.src = './icons/thunder.svg'
                }

                else if (id<400 && id>300)
                {
                    tempicon.src = './icons/clouds.svg'
                }

                else if (id<600 && id>500)
                {
                    tempicon.src = './icons/rain.svg'
                }

                else if (id<700 && id>600)
                {
                    tempicon.src = './icons/snowflake.svg'
                }

                else if (id<800 && id>700)
                {
                    tempicon.src = './icons/atmosphere.svg'
                }

                else if (id==800)
                {
                    tempicon.src = './icons/clear.svg'
                }
                
            })

        }
        )
    }

});



//2. Coad to search the city by keywords using search bar
searchButton.addEventListener('click', (e)=> 
{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

//Function
const getWeather = async (city)=>
{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3eb6eccdc6bca20ca1bf3f391c452885`,
            {mode: 'cors'}
        );

        const weatherData = await response.json();
        const {name} = weatherData;
        const {feels_like} = weatherData.main;
        const {id,main} = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273); 


        if (id<300 && id>200)
                {
                    tempicon.src = './icons/thunder.svg'
                }

                else if (id<400 && id>300)
                {
                    tempicon.src = './icons/clouds.svg'
                }

                else if (id<600 && id>500)
                {
                    tempicon.src = './icons/rain.svg'
                }

                else if (id<700 && id>600)
                {
                    tempicon.src = './icons/snowflake.svg'
                }

                else if (id<800 && id>700)
                {
                    tempicon.src = './icons/atmosphere.svg'
                }

                else if (id==800)
                {
                    tempicon.src = './icons/clear.svg'
                }
    

    
    }

catch(error)
{
    alert('City not found');
}


}; 
