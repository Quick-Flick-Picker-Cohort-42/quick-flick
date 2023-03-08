import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Results from './components/Results.js'
import ListPanel from './components/ListPanel.js';
import Footer from './components/Footer.js';
import Lists from './components/Lists.js';
import ErrorPage from './components/ErrorPage.js'
import FocusLock from 'react-focus-lock';
import SearchForm from './components/SearchForm.js'


function App() {

  // ! States
  // stores user's movie selection to add to a list
  const [toSend, setToSend] = useState({});

  // stores list selection input (from dropdown of existing lists)
  const [listSelection, setListSelection] = useState('');

  // stores lists coming back from Firebase
  const [dbList, setdbList] = useState({});

  // stores the unique key from each list in Firebase
  const [nodeKey, setNodeKey] = useState('');

  // stores API movie results
  const [movieObject, setMovieObject] = useState([]);

  // stores state of list open/close button
  const [listButton, setListButton] = useState(false);

  useEffect(() => {
    setMovieObject([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      // use .val() method to return the lists stored in firebase back to the page:
      const data = response.val();
      setdbList(data);
    })
  }, [])

  return (
    <div className='mainContainer'>
      <Routes>
        <Route path="/"
          element={
            <>
              {listButton
                ?
                <FocusLock>
                  <ListPanel
                    dbList={dbList}
                    setNodeKey={setNodeKey}
                    listButton={listButton}
                    setListButton={setListButton}
                  />
                </FocusLock>
                :
                <ListPanel
                  dbList={dbList}
                  setNodeKey={setNodeKey}
                  listButton={listButton}
                  setListButton={setListButton}
                />
              }
              <Header/>
              <SearchForm setMovieObject={setMovieObject} />
              <Results
                movieObject={movieObject}
                dbList={dbList}
                toSend={toSend}
                setToSend={setToSend}
                setListSelection={setListSelection}
                listSelection={listSelection}
              />
              <Footer />
            </>
          }
        />
        <Route path="/list/:listName" element={<Lists
          nodeKey={nodeKey}
          dbList={dbList}
          listButton={listButton}
          setListButton={setListButton}
          setNodeKey={setNodeKey} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;