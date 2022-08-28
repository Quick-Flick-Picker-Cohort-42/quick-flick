import './App.css';
import firebase from './firebase';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.js';
import Lists from './Lists.js';
import ErrorPage from './ErrorPage.js'


function App() {

  // ! States
  // tracks and stores user's movie title query
  const [movieInput, setMovieInput] = useState('');

  // stores API movie results
  const [movieObject, setMovieObject] = useState([]);

  // stores user's movie selection to add to a list
  const [toSend, setToSend] = useState({});

  // stores list selection input (from dropdown of existing lists)
  const [listSelection, setListSelection] = useState('');

  // tracks and stores user's list name input (when creating new list)
  const [list, setList] = useState({ listName: '' });

  // stores lists coming back from Firebase
  const [dbList, setdbList] = useState({});

  // stores the unique key from each list in Firebase
  const [nodeKey, setNodeKey] = useState('');

  const newListName = useRef(null);
  const newMovieInput = useRef(null)

  // handle list input
  const handleListInput = ((e) => {
    setList(current => {
      return { ...current, listName: e.target.value }
    });
  })

  // creates the list in firebase
  const handleListCreation = ((e) => {
    e.preventDefault()
    // console.log(list.listName)
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // creating node with unique key representing the entire list
    push(dbRef, list);
  })

  const handleRemoveList = (node) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${node}`);
    remove(dbRef)
  }

  // track user query:
  const handleMovieInput = ((e) => {
    setMovieInput(e.target.value)
  })

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // this is called/initialized on page load and persists (is always listening)
    onValue(dbRef, (response) => {
      // use .val() method to return the lists stored in firebase back to the page:
      const data = response.val();
      setdbList(data);
    })
  }, [])

  // handle movie query submit
  const handleSubmit = ((e) => {
    e.preventDefault()

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
          setMovieObject(movieResults);
          } else {
            alert("Looks like your search didn't yield any results 😕 Try searching using another search term.");
            // empty out input so that new search term can be entered
            const newMovieInputCurrent = newMovieInput.current;
            newMovieInputCurrent.value = '';
          }
        })
    } catch (error) {
      alert('Something seems to have gone wrong...try searching again')
    }
  })

  return (
    <>
      {/* <Header 
        handleMovieInput={handleMovieInput}   
        handleSubmit={handleSubmit} 
        movieInput={movieInput} 
      />
      <Results 
        movieObject={movieObject} 
        dbList={dbList}
        toSend={toSend}
        setToSend={setToSend}
        setListSelection={setListSelection}
        listSelection={listSelection} />
      <Lists />
      <ListPanel 
        handleListInput={handleListInput}
        list={list}
        handleListCreation={handleListCreation}
        dbList={dbList}
        handleRemoveList={handleRemoveList}
      /> */}

      <Routes>
        <Route path="/" element={
          <Home
            handleMovieInput={handleMovieInput}
            handleSubmit={handleSubmit}
            movieInput={movieInput}
            movieObject={movieObject}
            dbList={dbList}
            toSend={toSend}
            setToSend={setToSend}
            setListSelection={setListSelection}
            listSelection={listSelection}
            handleListInput={handleListInput}
            list={list}
            handleListCreation={handleListCreation}
            handleRemoveList={handleRemoveList}
            setNodeKey={setNodeKey}
            newListName={newListName}
            newMovieInput={newMovieInput}
          />}
        />
        <Route path="/list/:listName" element={<Lists nodeKey={nodeKey} setNodeKey={setNodeKey} dbList={dbList} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;