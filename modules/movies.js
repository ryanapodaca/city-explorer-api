'use strict';

const axios = require('axios');


async function getMovies (request, response, next){
  try {
    let query = request.query.query;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${query}`;

    let movieResults = await axios.get(url);
    console.log(movieResults.data.results);
    let movieDataToSend = movieResults.data.results.map(mObj => new Movie(mObj));

    response.status(200).send(movieDataToSend);

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