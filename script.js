const api_key="e1ed96901982c64b009270d839bd49b6";
const weatherform=document.querySelector(".weatherform");
const inputcity=document.querySelector(".inputcity");
const button=document.querySelector(".getweather");
const card=document.querySelector(".card");
weatherform.addEventListener("submit",async event=>{
event.preventDefault();
const city=inputcity.value.toLowerCase().trim();

if(city)
{
 const weather =await getweatherdata(city); 
 console.log(weather);
 await displayweather(weather);

}
else{
    disperror("enter a valid city");

}

});
async function getweatherdata(city){
const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
try{
    const response = await fetch(apiurl);
    if(!response.ok)
    {
    disperror("Could not Fetch");
    }
    else{
       return await response.json();
    }
}
catch(error)
{
    throw new Error(error);
    disperror("Could Not Fetch Data");
}

}
function disperror(error){

card.innerHTML="";
const errror_d=document.createElement("p");
errror_d.textContent=error;
card.appendChild(errror_d);
// errror_d.classList.add(".card h1");
errror_d.classList.add(".error-display");
}

function displayweather(weather) {
    // Update city name
    console.log(weather.name);
    const errorDisplay = document.querySelector(".error-display");
    if (errorDisplay) {
        errorDisplay.style.display = "none";
    }

    // Update city name
    const cityElement = document.querySelector(".city");
    cityElement.textContent = weather.name;

    // Update temperature (convert Kelvin to Celsius)
    const tempElement = document.querySelector(".temperature");
    const tempCelsius = (weather.main.temp - 273.15).toFixed(1);
    tempElement.textContent = `${tempCelsius}°C`;

    // Update humidity
    const humidityElement = document.querySelector(".humiditydisplay");
    humidityElement.textContent = `Humidity: ${weather.main.humidity}%`;

    // Update weather description
    const descElement = document.querySelector(".des_disp");
    descElement.textContent = weather.weather[0].description;

}
