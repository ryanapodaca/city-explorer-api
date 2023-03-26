'use strict';

const axios = require('axios');

let cache = {};

async function getMovies (request, response, next){
  try {
    let query = request.query.query;

    let key = `${query}-movies`;

    if (cache[key] && (Date.now() - cache[key].timestamp < 20000)){

      response.status(200).send(cache[key].data);
    } else{

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${query}`;

      let movieResults = await axios.get(url);
      console.log(movieResults.data.results);
      
      let movieDataToSend = movieResults.data.results.map(mObj => new Movie(mObj));

      //Build Cache
      cache[key] = {
        data: movieDataToSend,
        timestamp: Date.now()
      }

      response.status(200).send(movieDataToSend);
    }

  } catch (error){
    next(error);
  }
}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.original_title;
      this.overview = movieObj.overview;
      this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  }
}

module.exports = getMovies;