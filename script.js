
const cityElem = document.querySelector('.js-input');
const apiKey = 'ba377bb3839b80ec734b00d9dcf9da42'
const searchElem = document.querySelector('.js-search')
const weather = document.querySelector('.weather')

searchElem.focus()



async function checkWeather() {
  let city = cityElem.value;
  if (city === '') {
    document.querySelector('.error-message').style.display = "flex"
    weather.style.display = 'none'
    return;
  } else {
    document.querySelector('.error-message').style.display = "none"
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.status === 404) {
      document.querySelector('.error-message').style.display = "flex"
      weather.style.display = 'none'
      return;
    } else {
      console.log(data)
      document.querySelector('.js-temp').innerHTML = `${Math.round((data.main.temp - 273))}°C`
      document.querySelector('.js-humidity').innerHTML = `${data.main.humidity}%`
      document.querySelector('.js-wind').innerHTML = `${data.wind.speed}km/h`
      document.querySelector('.js-city').innerHTML = `${data['name']}`

      if (data.weather[0].main == "Clouds") {
        document.querySelector('.js-weather-img').src = "images/clouds.png"
      } else if (data.weather[0].main == "Clear") {
        document.querySelector('.js-weather-img').src = "images/clear.png"
      } else if (data.weather[0].main == "Rain") {
        document.querySelector('.js-weather-img').src = "images/rain.png"
      } else if (data.weather[0].main == "Drizzle") {
        document.querySelector('.js-weather-img').src = "images/drizzle.png"
      } else if (data.weather[0].main == "Mist") {
        document.querySelector('.js-weather-img').src = "images/mist.png"
      }
    }
    weather.style.display = "flex"
  }

}

searchElem.addEventListener('click', () => checkWeather())