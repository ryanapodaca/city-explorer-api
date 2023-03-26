'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
//const axios = require('axios');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

//Call Server
const app = express();

//Call Middleware
app.use(cors());

//Port for server 
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`running on port ${PORT}`));


app.get('/movies', getMovies);
app.get('/weather', getWeather);

//Catch all other errors as 404
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});


//Plug and play error handling from Express
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});





//weather api http://api.weatherbit.io/v2.0/forecast/daily?key lat lon

//movie api https://api.themoviedb.org/3/search/movie?api_key=APIKEYquery= city info from front end

//images https://image.tmdb.org/t/p/w500/<poster path>'not required' 


      // let dataToGroom = weatherData.find(o => o.city_name.toLowerCase() === cityName.toLowerCase());

      // //response.statusCode(200).send(dataToGroom);
      // //console.log(dataToGroom.data[0]);

      // let dataToSend = [];
      // for (let i = 0; i < dataToGroom.data.length; i++) {
      //   let dataToPush = new Forecast(dataToGroom.data[i].valid_date, dataToGroom.data[i].weather.description);
      //   dataToSend.push(dataToPush);
      // }

      // let weatherToSend = dataToGroom.data.map(day => new Forecast(day.valid_date, day.weather.description));
      ///