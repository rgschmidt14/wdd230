// select HTML elements in the document
const currentTemp = document.querySelector('.current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('.descOfWeather');
const currentWindSpeed = document.querySelector('.windMph');


const url = 'https://api.openweathermap.org/data/2.5/weather?q=Ogden&units=imperial&APPID=15d92f0c10640be1ab22b43ff41477ab';
//Ogden,ut,us

function  displayResults(weatherData) {
  currentWindSpeed.innerHTML = `${weatherData.wind.speed.toFixed(1)}`;
  currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;

  const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  const desc = weatherData.weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;


  let temp = document.getElementById("temperature").innerHTML;
  let wind = document.getElementById("windMph").innerHTML;
  let chill = windChill(wind, temp);
  document.getElementById("windChill").innerHTML = chill

  
}
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}
function windChill(wind, temp) {
  let chill = 35.74 + (.6215 * temp) - (35.75 * (wind ** .16)) + (.4275 * temp * (wind ** .16));
  return chill.toFixed(0)
}


apiFetch();