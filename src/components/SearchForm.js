import axios from 'axios';
import { useState } from 'react';


const SearchForm = ({ setMovieObject }) => {


  // tracks and stores user's movie title query
  const [movieInput, setMovieInput] = useState('');

  // track user query:
  const handleMovieInput = ((e) => {
    setMovieInput(e.target.value)
  })

  // handle movie query submit
  const handleSubmit = ((e) => {
    e.preventDefault()
    setMovieObject([])
    getMovies()
    setMovieInput('')
  })

  function getMovies() {
    try {
      axios({
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          api_key: '636ef606db6eb961991793ba4935ad7e',
          language: 'en-US',
          include_adult: 'false',
          include_video: 'false',
          query: movieInput
        },
      }).then((res) => {
        const movieResults = res.data.results;
        if (movieResults.length !== 0) {

          // empty out input so that new search term can be entered
          return (movieResults)
        } else {
          alert("Looks like your search didn't yield any results 😕 Try searching using another search term.");
        }
      }).then((res) => { //!get additional credits and video data for each movie
        for (let movie of res) {
          axios({
            url: `https://api.themoviedb.org/3/movie/${movie.id}`,
            params: {
              api_key: '636ef606db6eb961991793ba4935ad7e',
              append_to_response: 'videos,credits',
            }
          }).then((res) => {

            collectMovieInfo(res.data)

          })
        }
      })
    } catch (error) {
      alert('Something seems to have gone wrong...try searching again')
    }

  }

  const collectMovieInfo = obj => {
    setMovieObject(current => [...current, obj])
  }

  return (
    <>

      <p className="intro">
        Quick Flicks lets you to search for movies, make custom lists, and filters through your list by genre and duration to return a movie suggestion for you!
      </p>

      <form action="" onSubmit={handleSubmit} >
        <label
          htmlFor="movie-input"
          className="sr-only"
        >Search for a movie
        </label>
        <input
          onChange={handleMovieInput}
          value={movieInput}
          type="text"
          id="movie-input"
          required
          placeholder="Search for a movie"
          autoComplete="off"
        />
        <button>Find a flick!</button>
      </form>
    </>
  )
}

export default SearchForm;