import './App.css';
import firebase from './firebase';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';
import ListPanel from './ListPanel.js';


function App() {
  // stores user's movie title query
  const [movieInput, setMovieInput] = useState('');

  // stores api movie results
  const [movieObjects, setMovieObjects] = useState([]);

  // stores lists
  const [list, setList] = useState({listName:''});

  // stores lists coming back from firebase
  const [dbList, setdbList] = useState({});

  // track user query:
  const handleMovieInput = ( (e) => {
    setMovieInput(e.target.value)
  })  

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
    }).then( (res) => {
      const movieResults = res.data.results;
      
      setMovieObjects(movieResults);
      
    })

  })

  return (
    <>
      
    <Header 
      handleMovieInput={handleMovieInput}   
      handleSubmit={handleSubmit} 
      movieInput={movieInput} 
    />

    <ListPanel 
      handleListInput={handleListInput}
      list={list}
      handleListCreation={handleListCreation}
      dbList={dbList}
    />

    
    </>
  );
}

export default App;
