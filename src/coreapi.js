const request = require('postman-request');

const weatherApiURL = 'https://api.weatherstack.com/current?access_key=d6c57b20bde6e7134d5c776de5a0fe3b&query='
//const weatherApiURL = 'https://api.weatherstack.com/current?access_key=d6c57b20bde6e7134d5c776de5a0fe3b&query=Leimen'
const geoCodeApiURL = 'https://api.mapbox.com/search/geocode/v6/forward?q={location}&access_token=pk.eyJ1IjoiZnVubnlpbXAiLCJhIjoiY21qdzJ2aTg4MzY5aDNjc2VsejFhZ25qdCJ9.lpKySW7gc_4B8FBRa77cXQ&limit=1'
//const geoCodeApiURL = 'https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoiZnVubnlpbXAiLCJhIjoiY21qdzJ2aTg4MzY5aDNjc2VsejFhZ25qdCJ9.lpKySW7gc_4B8FBRa77cXQ&limit=1'

const getWeather = (location, callback) => {
    //const URLWithLocation = weatherApiURL + encodeURIComponent(location);
    const URLWithLocation = weatherApiURL + location;
    console.log(URLWithLocation);
    request({ url: URLWithLocation, json: true }, (error, response, body) => {
        if (error) {
            const errorRef = new Error('Error: Unable to connect to WeatherAPI')
            callback(errorRef, null);
            return;
        } else if (body.error) {
            const errorRef = new Error(body.error.code + ' Error Invalid input to weatherapi')
            callback(errorRef, null);
            return;
        } else {

            const weatherData = {
                location: body.location,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                precipitation: body.current.precip
            }
            callback(null, weatherData);
        }
    })
};

const buildGeoCodeURL = (location) => {

    return geoCodeApiURL.replace('{location}', encodeURIComponent(location));

};

const getCordinates = (location, callback) => {
    if (!location) {
        console.log('Location cannot be empty to fetch coordinates');
        return;
    }

    const url = buildGeoCodeURL(location);
    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            const errorRef = new Error('Error: Unable to connect to GeocodeAPI')
            callback(errorRef, null);
            return;
            //console.log('Error: Unable to connect to GeocodeAPI')
        } else if (body.error) {
            const errorRef = new Error(body.error.code + ' Error Invalid input')
            callback(errorRef, null);
            return;
        } else if (!body.features[0]) {
            const errorRef = new Error('Error: Invalid Response from API')
            callback(errorRef, null);
            return;

        }else {
            const locationData = {
                place: body.features[0].properties.full_address,
                longitude: body.features[0].properties.coordinates.longitude,
                lattitude: body.features[0].properties.coordinates.latitude
            }

            callback(null, locationData);
        }

    })
}

module.exports = {
    forecast: getWeather,
    coordinates: getCordinates

}