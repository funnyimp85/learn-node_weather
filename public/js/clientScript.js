/* fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })

})


fetch('http://localhost:3000/weather?address=leimen').then((response) => {
    response.json().then((forecast)=>{
        if(forecast.error)
        return console.log(forecast.error);
        else console.log(forecast);
    })
})
     */

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const result = document.getElementById('result');

    if (!location) {
        result.style.display = 'block';
        result.innerHTML = '<p>Please enter a location</p>';
        return;
    }
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((forecast) => {
            console.log(forecast);
            if (forecast.error) {
                result.style.display = 'block';
                result.innerHTML = `<p>${forecast.error}</p>`;
                return
            }

            const data = forecast;

            result.style.display = 'block';
            result.innerHTML = `
                <div style="
                    max-width:400px;
                    margin:auto;
                    background:#fff;
                    padding:20px;
                    border-radius:8px;
                    box-shadow:0 2px 8px rgba(0,0,0,0.1);
                    text-align:left;
                ">

                <h3>${data.location.name}, ${data.location.region}</h3>
                    <p><strong>Country:</strong> ${data.location.country}</p>
                    <p><strong>Latitude:</strong> ${data.location.lat}</p>
                    <p><strong>Longitude:</strong> ${data.location.lon}</p>
                    <p><strong>Local Time:</strong> ${data.location.localtime}</p>
                    <hr>
                    <p><strong>Temperature:</strong> ${data.temperature}°C</p>
                    <p><strong>Feels Like:</strong> ${data.feelslike}°C</p>
                    <p><strong>Precipitation:</strong> ${data.precipitation} mm</p>
                </div>
                `;

        })
    })

}


