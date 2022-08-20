import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Results from './Results.js'
import Lists from './Lists.js';


function App() {

//! States
  // stores user's movie title query
  const [movieInput, setMovieInput] = useState('');
  // stores api movie results
  const [movieObject, setMovieObject] = useState([]);
  //store movie to send
  const [sendMovie, setSendMovie] = useState({});

//!functions
  // API call on user submit
  const handleSubmit = ( (e) => {
    e.preventDefault()
    
    axios({
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        api_key: '636ef606db6eb961991793ba4935ad7e',
        language: 'en-US',
        include_adult: 'false',
        include_video: 'false',
        query: movieInput  
      },
    }).then( (res) => {
      const movieResults = res.data.results;
      
      setMovieObject(movieResults);
    })
  })

  // track user query:
  const handleMovieInput = ((e) => {
    setMovieInput(e.target.value)
  })  

  //add movie to one of the lhe lists in list component
  const addMovie = (e, movie) => {
    e.preventDefault()
    setSendMovie(movie)

  }

  return (
    <div>
      <Header handleMovieInput={handleMovieInput} handleSubmit={handleSubmit} movieInput={movieInput} />
      <Results movieObject={movieObject} addMovie={addMovie}/>
      <Lists sendMovie={sendMovie}/>
    </div>
  );
}

export default App;
