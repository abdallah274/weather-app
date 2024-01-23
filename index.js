"use strict";
const contact = document.getElementById("contact");
const home = document.getElementById("home");
const links= document.querySelectorAll('.nav-link');
// day one
let dayName = document.getElementById('day');
let date = document.getElementById('date');
let locationCity = document.getElementById('location');
let tempNumber = document.getElementById('num');
let todayImg = document.getElementById('img');
let todayWind = document.getElementById('wind');
//next day
let nextDayName = document.getElementsByClassName('day');
let nextDayImg = document.getElementsByClassName('next-day-img');
let nextDayTmp = document.getElementsByClassName('next-day-tmp');
let minTemp =document.getElementsByClassName('min-temp')
let dayWind = document.getElementsByClassName('day-wind');
//search
const search = document.getElementById("search");



contact.addEventListener("click", function () {
  document.getElementById("box").classList.add("d-none");
  document.getElementById("contact-con").classList.remove("d-none");
  document.getElementById("contact").classList.add("hover");
  document.getElementById("home").classList.remove("hover");
});
home.addEventListener("click", function () {
  document.getElementById("box").classList.remove("d-none");
  document.getElementById("home").classList.add("hover");
  document.getElementById("contact").classList.remove("hover");
  document.getElementById("contact-con").classList.add("d-none");
});

let dataweather=[];
/* 
https://api.weatherapi.com/v1/forecast.json?key=a11d7636586f47a491c122448240601&q=$%7Bahmed%7D07112&days=3%60
*/
// 3e892f27127e463cadb112947240701
//a11d7636586f47a491c122448240601
async function getData(cityName) {
 let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a11d7636586f47a491c122448240601&q=${cityName}&days=3`);
 let dataweather = await response.json();
  return dataweather

}

// dispaly weather data ===> day one
;
function dispalyData(data) {
  let toDayName = new Date();
  console.log(toDayName);
  dayName.innerHTML = toDayName.toLocaleDateString("en-US" , {weekday: "long"});
  date.innerHTML = toDayName.getDate()
  document.getElementById('month').innerHTML = toDayName.toLocaleDateString("en-US" ,{month: "long"})
  locationCity.innerHTML = data.location.name;
  tempNumber.innerHTML = data.current.temp_c;
  todayImg.setAttribute('src', data.current.condition.icon);
  todayWind.innerHTML = data.current.condition.text;
  // date.innerHTML = data.forecast.forecastday.date;
}
// display weather next day
function dispalyNextDay(data) {
  let forecastData = data.forecast.forecastday
  for(let i = 0 ; i < 2 ; i++){
    let nextDate = new Date(forecastData[i+1].date)
    console.log(nextDate);
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday: "long"})
    nextDayTmp[i].innerHTML = forecastData[i +1].day.maxtemp_c;
    minTemp[i].innerHTML = forecastData[i +1].day.mintemp_c;
    nextDayImg[i].setAttribute('src' , forecastData[i + 1].day.condition.icon);
    dayWind[i].innerHTML = forecastData[i + 1].day.condition.text;
  }

}
async function startApp(city="london") {
  let dataweather =await getData(city);
  dispalyData(dataweather);
 dispalyNextDay(dataweather)
}
startApp()
search.addEventListener('input' , function(){
  startApp(search.value)
})
