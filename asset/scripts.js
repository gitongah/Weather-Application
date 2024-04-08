const weatherAppAPIKey = "879de671ac3d30a2b5bae566c0ca36b0"

const searchSection = document.getElementById('search-section');
const btnSearch = document.querySelector('#search-btn');
const inputSearch = document.querySelector('#input-search');
const displayCurrentTime = document.querySelector('#time');
const displayCurrentDate = document.querySelector('#date')
const displayTemp = document.querySelector('#current-temp');
const displayHumid = document.querySelector('#current-humidity');
const displayWind = document.querySelector('#current-wind-speed');

const days = ['Sunday','Monday','Tuesday', 'Wednesday', 
'Thursady', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];




setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const ampm =hour >= 12 ? 'PM' : 'AM'
    displayCurrentTime.innerHTML = hoursIn12HrFormat +  ':' + minutes+ '' +`<span id="am-pm">${ampm}</span>`
    displayCurrentDate.innerHTML = days[day] + ' , ' + date + ' '+months[month]
    
}, 1000);

const startSearch =() => {
    weatherApiCall(inputSearch.value)
    const btnPrev = document.createElement('button')
    btnPrev.textContent = inputSearch.value;
    searchSection.appendChild(btnPrev);
    btnPrev.addEventListener('click', startSearch)
    
}
const secondSearch = () => {


}

btnSearch.addEventListener('click', startSearch)

const weatherApiCall =(city) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAppAPIKey}`;
    fetch(url).then(function(response){
    return response.json();
}).then(function(data){
    const latitude = data[0].lat;
    const longitude = data[0].lon;
    // console.log(latitude, longitude);

    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherAppAPIKey}`
    fetch(url2).then(function(response2) {
        return response2.json();
    }).then(function(data2){
        // console.log("--------- Second request with forecase --------")
        console.log(data2);
        for(let i = 0; i < data2.list.length; i++){
            console.log(data2.list[i].main.temp)
            // const temp = document.createElement('p');
            const humidity = document.createElement('p');
            const wind = document.createElement('p');
            const forecastDate = document.createElement('p');
            forecastDate.textContent = `the date is ${data2.list[i].dt_txt}`;
            displayTemp.textContent=`${data2.list[i].main.temp} `;
            displayHumid.textContent=`${data2.list[i].main.humidity}%`;
            displayWind.textContent=`${data2.list[i].wind.speed} MPH`;
            // console.log(data2.list[i].main.humidity)
            // console.log(data2.list[i].wind.speed)
            // displayTemp.appendChild(temp);

        }
    })

})

}

