const path = require('path');
const api = require('./coreapi.js');

const express = require('express');
const app = express();
const hbs = require('hbs');

// Define paths for express Configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partiaslsPath = path.join(__dirname, '../templates/partials');


// setup handlebars and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partiaslsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome, Guest',
        banner: 'Welcome to the Weather App',
        text: 'Here is your location details and weather information'

    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        head: 'Help & Support',
        text1: 'To view weather details, navigate to the Weather page from the home screen.',
        text2: 'If you experience any issues, ensure your browser supports modern HTML5 features and refresh the page',
        url: "/",
        urlText: 'Back to Home'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        head: 'About this application',
        text1: 'This is a simple static weather application created to demonstrate',
        text2: 'Displays location information such as city, state, and country, along with geographic coordinates and temperature.',
        url: '/',
        urlText: 'Back to Home'
    });
});


app.get('/weather', (req, res) => {
    const location = req.query.address;
    if (!location) {
        return res.send({
            error: 'No address selected'
        })
    }


    api.coordinates(location, (error, data) => {
        console.log(location)
        if (error) {
            return res.send({
                error: error.message
            })

        } else {
            
            const coordinates = data.lattitude + ',' + data.longitude;
            api.forecast(coordinates, (error, data) => {
                if (error) {
                    return res.send({
                        error: error.message
                    })

                } else {
                    return res.send(data);

                }
            })

        }

    })


});


app.use((req, res) => {
    res.send('my 404 page');
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
});