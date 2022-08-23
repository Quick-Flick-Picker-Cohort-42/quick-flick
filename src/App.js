import './App.css';
import firebase from './firebase';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Results from './Results.js'
import Lists from './Lists.js'
import ListPanel from './ListPanel.js';


function App() {

// ! States
  // stores user's movie title query
  const [movieInput, setMovieInput] = useState('');

  // stores api movie results
  const [movieObject, setMovieObject] = useState([]);
  
  // store movie to send
  const [toSend, setToSend] = useState({});

  // store list selection input
  const [listSelection, setListSelection] = useState('');

  // stores lists
  const [list, setList] = useState({listName:''});

  // stores lists coming back from firebase
  const [dbList, setdbList] = useState({});

  // handle list input
  const handleListInput = ( (e) => {
    setList( current => {
      return { ...current, listName: e.target.value }
    });
  })

  // creates the list in firebase
  const handleListCreation = ( (e) => {
    e.preventDefault()
    // console.log(list.listName)
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // creating node with unique key representing the entire list
    push(dbRef, list)
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

  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // this is called/initialized on page load and persists (is always listening)
    onValue(dbRef, (response) => {
      // use .val() method to return the lists stored in firebase back to the page:
      const data = response.val();
      setdbList(data);
    })
    // console.log(list)
  }, [])

  // handle movie title submit
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
    }).then((res) => {
      const movieResults = res.data.results;

      
      setMovieObject(movieResults);
    })

  })

  return (
    <>
      <Header 
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
      />
    </>
  );
}

export default App;
