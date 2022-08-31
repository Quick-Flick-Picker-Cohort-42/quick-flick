
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from './ErrorPage';
import ListPanel from './ListPanel';
import firebase from './firebase';
import { getDatabase, ref, remove } from 'firebase/database';
import Footer from './Footer.js';

const Lists = ({ nodeKey, dbList, handleListInput, list, handleListCreation, handleRemoveList, setNodeKey }) => {
  const { listName } = useParams();
  //! when user refreshes page on a list, program breaks

  //!states
  const [currentList, setCurrentList] = useState({});
  const [listExists, setListExists] = useState(false);
  const [genres, setGenres] = useState([]);
  const [chosenGenre, setChosenGenre] = useState('');
  const [chosenDuration, setChosenDuration] = useState('');
  const [randomMovie, setRandomMovie] = useState('');


  // let movieRef = useRef()

  // console.log(listName)
  // obtain node key of current list from URL (instead of setting on DisplayList on click)...
  useEffect(() => {
    // console.log(dbList)
    for (let list in dbList) {
      // console.log(dbList[list].listName);
      // if list name in URL matches a list name from dbList (list from Firebase), get the Firebase node key of that list
      if (listName === dbList[list].listName) {
        // console.log(list);
        setNodeKey(list);
        setListExists(true)
      }
    }
  }, [dbList, listName, setNodeKey])

  // if nodeKey is set, update currentList state so that it stores all of the movie objects from the current list
  useEffect(() => {
    if (nodeKey) {
      setCurrentList(dbList[nodeKey].movies)
    }
  }, [nodeKey, dbList])

  //asynchronous function: awaits for API call in each loop, then compares and pushes movie ID to array
  async function findRandomMovie(genreMatchedMovies, arrayOfMatchedMovies) {
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
    return (arrayOfMatchedMovies)
  }

  const handleNLF = (e) => {
    e.preventDefault()
    // on submit, reset the styling on the previously suggested movie
    const movieList = document.querySelectorAll('li')
    movieList.forEach((movie) => {
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

    findRandomMovie(genreMatch, moviesMatched).then((res) => {
      // if there are movies that match both the genre and length, select a random movie; otherwise display alerts

      console.log(genreMatch.length)
      console.log(moviesMatched.length)
      if (genreMatch.length !== 0 && moviesMatched.length !== 0) {
        // generate random movie from the list of movies that match the criteria selected by the user
        const finalMovie = res[(Math.floor(Math.random() * res.length))]

        const allMovies = document.querySelectorAll('.listPoster');
        allMovies.forEach((movie) => {
          movie.style.backgroundColor = 'var(--blue)';
          movie.style.boxShadow = "none";
        })

        if (document.querySelector('.winningText')) {
          document.querySelector('.winningText').remove()
        }

        let winningMovie = document.createElement('p');
        winningMovie.classList.add('winningText')
        winningMovie.textContent = 'Try This!';


        document.getElementById(finalMovie).append(winningMovie);

        // set randomMovie state to the random movie title (to be used to render text onto page displaying the suggested movie)
        setRandomMovie(document.getElementById(finalMovie).textContent);

        //!can come back to this later (change to useRef())
        // styling for the suggested movie

        document.getElementById(finalMovie).style.backgroundColor = `var(--beige)`;
        document.getElementById(finalMovie).style.boxShadow = `0 0 40px 10px orange`;


        document.getElementById(finalMovie).scrollIntoView({ block: "center" })

      } else if (genreMatch.length === 0 && moviesMatched.length === 0) {
        alert('No movies on your list match this genre and/or length. Please select another genre and/or movie length.')
      } else if (moviesMatched.length === 0) {
        alert('No movies on your list match this length. Please select another movie length.')
      } else if (genreMatch.length === 0) {
        alert('No movies on your list match this genre. Please select another genre.')
      }
    })
  }

  const handleGenreSelection = (e) => {
    setChosenGenre(e.target.value);
  }

  const handleDurationSelection = (e) => {
    setChosenDuration(e.target.value);
  }

  const handleRemoveFromList = (movie) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${nodeKey}/movies/${movie[0]}`);
    remove(dbRef)
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
    <>

      {
        listExists ?
          <section className="userList">
            <h2>{listName}</h2>
            {/* NOTE - need to error handle movie dupes in the same list. need to also check what happens if the same movie is in two different lists */}
            {
              currentList ?
                <>
                  {/* if randomMovie has been set, display paragraph to indicate the suggested movie */}
                  {
                    randomMovie ?
                      <p>Quick Flick Picker picks <span>{randomMovie}</span> for you to watch!</p>
                      : null
                  }
                  <form onSubmit={(e) => handleNLF(e)}>
                    <p>I feel like watching a </p>
                    <label htmlFor="genre" className="sr-only">choose a genre</label>
                    <select
                      name="genre"
                      id="genre"
                      required
                      onChange={handleGenreSelection}
                      value={chosenGenre} >
                      <option disabled value="">select a genre</option>
                      {genres.map((genreObject) => {
                        return (
                          <option key={genreObject.id} value={genreObject.id}>{genreObject.name}</option>
                        )
                      })}
                    </select>
                    <p>movie, and I have</p>
                    <label htmlFor="duration" className="sr-only">choose a duration</label>
                    <select
                      name="duration"
                      id="duration"
                      required
                      onChange={handleDurationSelection}
                      value={chosenDuration}
                    >
                      <option disabled value="">select a duration</option>
                      <option value="90">Less than 1.5 hours</option>
                      <option value="120">Less than 2 hours</option>
                      <option value="1000">All the time in the world</option>
                    </select>
                    <button>Submit</button>
                  </form>
                  <Link to="/"><span className='homeLink'>Back to Home</span></Link>
                  <ul>
                    {Object.entries(currentList).map((movie) => {
                      return (
                        <li className='listPoster' key={movie[1].id} id={movie[1].id}>
                          <h3>{movie[1].title}</h3>
                          <img src={movie[1].poster_path ? `https://image.tmdb.org/t/p/w500${movie[1].poster_path}` : '../noMoviePoster.png'} alt={`A poster of the movie ${movie[1].original_title}`} />

                          <button className='listButton' onClick={() => handleRemoveFromList(movie)}>Remove from list</button>
                        </li>
                      )
                    })}
                  </ul>


                </>
                :
                <>
                  <p>No movies have been added to this list! Try adding a movie first.</p>
                  <Link to="/">Back to Home</Link>
                </>
            }
            {/* pass in lists as link url in displayList component, and dynamically render the unique list names and movie object titles (map), based on the key that was selected (ie list key) */}
          </section>
          : <ErrorPage />
      }
      <ListPanel
        handleListInput={handleListInput}
        list={list}
        handleListCreation={handleListCreation}
        dbList={dbList}
        handleRemoveList={handleRemoveList}
        setNodeKey={setNodeKey}
      />

      <Footer />
    </>
  )
}

// probably going to need to nest user generated list components inside this component and then route it on click, and then in those lists, send my movie data to this section here

export default Lists;