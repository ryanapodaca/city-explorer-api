'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
//let weatherData = require('./data/weather.json');

//Call Server
const app = express();

//Call Middleware
app.use(cors());

//Port for server 
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`running on port ${PORT}`));

//movie endpoint and class
app.get('/movies', async (request, response, next) => {
  try {
    //let api_key = request.query.api_key;
    let query = request.query.query;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${query}`;

    let movieResults = await axios.get(url);
    console.log(movieResults.data.results);
    let movieDataToSend = movieResults.data.results.map(mObj => new Movie(mObj));

    response.status(200).send(movieDataToSend);

  } catch (error){
    next(error);
  }
})

class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
      this.overview = movieObj.overview;
      this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  }
}

//weather endpoint and class
app.get('/weather', async (request, response, next) => {

    try {
      let lat = request.query.lat;
      let lon = request.query.lon;
     

      //build url
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`;

      let dataResults = await axios.get(url);
      //console.log(dataResults.data.data);
      //groom data for front end
      let dataToSend = dataResults.data.data.map(fObj => new Forecast(fObj));

      response.status(200).send(dataToSend);


    } catch (error) {
      next(error);
    }
  })

class Forecast {
  constructor(fObj) {
    this.description = fObj.weather.description;
    this.date = fObj.valid_date;
  }
}


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