const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const accuApi = new AccuWeatherApi();
//updating the ui:
const updateUI = ({ cityDetails, weather }) =>
{
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
    `
     // update the icons ..
     const iconsource = `img/icons/${weather.WeatherIcon}.svg`;
     icon.setAttribute('src', iconsource);
     // update the night/day 
     let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
     time.setAttribute('src', timeSource);     
     card.classList.add('fade-in');
     setTimeout(()=>
     {
         console.log("animation ends ...");
         card.classList.remove('fade-in');
     }, 1200);
     
    //remove the d-none class if present
    if(card.classList.contains('d-none'))
    {
        card.classList.remove('d-none');
       
    }
}


      cityForm.addEventListener('submit', e =>
      {
        //prevent default action
        e.preventDefault();
        //get city value from input
        const city = cityForm.city.value.trim();
        cityForm.reset();
        //update the ui with the new city
        accuApi.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
        //set a local storage:
        window.localStorage.setItem('city', city);
      });
      
    if(localStorage.getItem('city'))
    {
        accuApi.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    }
