'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');

//Call Server
const app = express();

//Call Middleware
app.use(cors());

//Port for server 
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`running on port ${PORT}`));

//Endpoints


app.get('/weather', (request, response, next)=> {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;
    let dataToGroom = data.find(o => o.city_name === searchQuery);
    
    console.log(dataToGroom.data[0]);
    
    let dataToSend = [];
    for (let i = 0; i < dataToGroom.data.length; i++) {
      let dataToPush = new Forecast(dataToGroom.data[i].valid_date, dataToGroom.data[i].weather.description);
      dataToSend.push(dataToPush);
    }
       
    response.status(200).send(dataToSend);

    
  } catch (error) {
    // console.log(error.message);
    next(error.message);
  }
});

class Forecast {
  constructor(date, description){
    this.description = description;
    this.date = date;
  }
}

//Catch all other errors as 404
app.get('*', (request,response) => {
  response.status(404).send('This route does not exist');
});


//Plug and play error handling from Express
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});