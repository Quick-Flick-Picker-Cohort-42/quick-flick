import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header.js';


function App() {
  // stores user's movie title query
  const [movieInput, setMovieInput] = useState('');

  // stores api movie results
  const [movieObjects, setMovieObjects] = useState([]);



  // track user query:
  const handleMovieInput = ( (e) => {
    setMovieInput(e.target.value)
  })  

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
      
      setMovieObjects(movieResults);
      
    })

  })

  return (
    <>
      
    <Header handleMovieInput={handleMovieInput} handleSubmit={handleSubmit} movieInput={movieInput} />


    
    </>
  );
}

export default App;
