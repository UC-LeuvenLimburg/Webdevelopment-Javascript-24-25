document.getElementById("toonWeer").addEventListener("click", function(){
    let stad = document.getElementById("plaatsNaam").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+ stad +"&appid=0c2ca58148c45d28df0bdb1da958d03b&units=metric&lang=nl"
    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw Error("HTTP error: " + response.statusText);
         }   
        return response.json();
    })
    .then(data => { 
        console.log(data);
        let name = data.name;
        let counrty = data.sys.country;
        let temperature = data.main.temp;
        let description = data.weather[0].description;
        let icon = data.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        let windSpeed = data.wind.speed;

        document.getElementById("resultaat").innerHTML = "<strong>"+ name + ", " + counrty + "</strong> " + temperature + " graden " + description + " <img src='" + iconUrl + "' alt = '"+ description +"'> " + windSpeed;

    })
    .catch(error => {
        document.getElementById("resultaat").innerHTML = "Zoekopdracht voor " + stad + " mislukt! "
        console.error(error);
    });
});