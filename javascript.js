'use strict'
const countriesContainer=document.querySelector('.container');
/////////////////////////////

const renderCountry = function(data,className=""){
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}
///////////////////////////
console.log("working fine");
const getCountryData = (country_name)=>{
    // alert("working fine");
const request = new XMLHttpRequest();
request.open('GET',`https://restcountries.com/v2/name/${country_name}`);
request.send();
request.addEventListener('load',function(){
    console.log("data has been loaded");
    let [data]=JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);
    //////get neighbour country 
    const [neighbour] = data.borders;


    if(!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET',`https://restcountries.com/v2/name/${neighbour}`);
    request2.send();
    request2.addEventListener('load',function(){
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2,"neighbour");

    });
    
});
}
// getCountryData("sri lanka");
getCountryData("canada");

