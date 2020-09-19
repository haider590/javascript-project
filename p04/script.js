// Geting Elements from DOM
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two'); 
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');

//Fetch exchange rate from 3rd party API and update DOM
//www.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;

    fetch(`https://v6.exchangerate-api.com/v6/3b0c55e548894e43d6bca4ed/latest/${currencyOneCode}`)
        .then( res => res.json() )
        .then( data => {
            //Get the exchange rate from API Data
            const exchangeRate = data.conversion_rates[currencyTwoCode];

            // Display the Conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            // Apply Conversion Rate and Amount of Currency two
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);

        });
}

// Flip function fo the flip button to reverse currency exchange
function flip() {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
};

//Event Listeners
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);

calculate();