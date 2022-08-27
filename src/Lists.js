import './Lists.css'
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Lists = ({ nodeKey, dbList }) => {
  const { listName } = useParams();
  //! when user refreshes page on a list, program breaks
  const currentList = dbList[nodeKey].movies;

  //!states
  const [genres, setGenres] = useState([]);
  const [chosenGenre, setChosenGenre] = useState('');
  const [chosenDuration, setChosenDuration] = useState('');
  const [randomMovie, setRandomMovie] = useState('')

  // let movieRef = useRef()

  //asynchronous function: awaits for API call in each loop, then compares and pushes movie ID to array
  async function findRandomMovie (genreMatchedMovies, arrayOfMatchedMovies) {
    for (let movieId of genreMatchedMovies) {
      await
        axios({
          url: `https://api.themoviedb.org/3/movie/${movieId}`,
          params: {
            api_key: '636ef606db6eb961991793ba4935ad7e',
          }
        }).then((res) => {
          if (res.data.runtime < parseInt(chosenDuration)) {
            arrayOfMatchedMovies.push(res.data.id)
            
          }
        })
    }
    return(arrayOfMatchedMovies)
  }

  const handleNLF = (e) => {
    e.preventDefault()
    const movieList = document.querySelectorAll('li')
    movieList.forEach((movie)=>{
      movie.style.opacity = 1
    })

    const genreMatch = [];
    const moviesMatched = [];

    for (let movie in currentList) {
      const movieListGenres = currentList[movie].genre_ids;
      for (let movieListGenre in movieListGenres) {
        if (movieListGenres[movieListGenre] === parseInt(chosenGenre)) {
          genreMatch.push(currentList[movie].id)
        }
      }
    }
    
    findRandomMovie(genreMatch, moviesMatched).then((res)=>{
      const finalMovie = res[(Math.floor(Math.random() * res.length))]
      console.log(finalMovie)
      console.log(currentList)

      //!can come back to this later (change to useRef())
      document.getElementById(finalMovie).style.opacity = 0.2

    })
  }

  const handleGenreSelection = (e) => {
    setChosenGenre(e.target.value);
  }

  const handleDurationSelection = (e) => {
    setChosenDuration(e.target.value);
  }

  useEffect(() => {
    //genre API call to populate the genre select with a list of all current genres from TMDB
    axios({
      url: 'https://api.themoviedb.org/3/genre/movie/list',
      params: {
        api_key: '636ef606db6eb961991793ba4935ad7e',
      },
    }).then((res) => {
      setGenres(res.data.genres)
      // const movieResults = res.data.results;
      // setMovieObject(movieResults);
    })

  }, [])


  return (

    <section className="userList">

      <h2>{listName}</h2>
      {/* NOTE - need to error handle movie dupes in the same list. need to also check what happens if the same movie is in two different lists */}
      {
        currentList ?
          <>
            {/* {
              randomMovieReturned ?
              <p></p>
            } */}
            <form onSubmit={(e) => handleNLF(e)}>
              <p>I feel like watching a/an </p>
              <label htmlFor="genre" className="sr-only">Choose a genre</label>
              <select
                name="genre"
                id="genre"
                required
                onChange={handleGenreSelection}
                value={chosenGenre} >
                <option disabled value="">Select a genre</option>
                {genres.map((genreObject) => {
                  return (
                    <option key={genreObject.id} value={genreObject.id}>{genreObject.name}</option>
                  )
                })}
              </select>
              <p>movie, and I have</p>
              <label htmlFor="duration" className="sr-only">Choose a duration</label>
              <select
                name="duration"
                id="duration"
                required
                onChange={handleDurationSelection}
                value={chosenDuration}
              >
                <option disabled value="">Select a duration</option>
                <option value="90">Less than 1.5 hours</option>
                <option value="120">Less than 2 hours</option>
                <option value="1000">All the time in the world</option>
              </select>
              <button>Submit</button>
            </form>
            <Link to="/">Back to Home</Link>
            <ul>
              {Object.entries(currentList).map((movie) => {

                return (
                  <li key={movie[1].id} id={movie[1].id}>
                    <div className="imgContainer">
                      <img src={`https://image.tmdb.org/t/p/w500${movie[1].poster_path}`} alt={`A poster of the movie ${movie[1].original_title}`} />
                    </div>
                    <h3>{movie[1].title}</h3>
                  </li>
                )

              })}
            </ul>
            
            <Link to="/">Back to Home</Link>
          </>
          :
          <p>No movies have been added to this list! Try adding a movie first.</p>
      }
      {/* pass in lists as link url in displayList component, and dynamically render the unique list names and movie object titles (map), based on the key that was selected (ie list key) */}
    </section>

  )
}

// probably going to need to nest user generated list components inside this component and then route it on click, and then in those lists, send my movie data to this section here

export default Lists;