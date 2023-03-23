'use strict';

const axios = require('axios');


async function getWeather(request, response, next) {
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
}

class Forecast {
  constructor(fObj) {
    this.description = fObj.weather.description;
    this.date = fObj.valid_date;
  }
}

module.exports = getWeather;