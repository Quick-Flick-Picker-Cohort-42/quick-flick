import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Results from './components/Results.js'
import ListPanel from './components/ListPanel.js';
import Footer from './components/Footer.js';
import Lists from './pages/Lists.js';
import ErrorPage from './pages/ErrorPage.js'
import FocusLock from 'react-focus-lock';
import SearchForm from './components/SearchForm.js'
import ListPanelButton from './components/ListPanelButton';


function App() {

  const [toSend, setToSend] = useState({}); // user's movie selection to add to a list
  const [listSelection, setListSelection] = useState(''); // list input (from dropdown of existing lists)
  const [dbList, setdbList] = useState({}); // lists coming back from Firebase
  const [nodeKey, setNodeKey] = useState(''); // unique key from each list in Firebase
  const [movieObject, setMovieObject] = useState([]); // API movie results
  const [listButton, setListButton] = useState(false);  // movie list open/close button

  useEffect(() => {
    setMovieObject([]);

    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      // return the lists stored in firebase back to the page:
      const data = response.val();
      setdbList(data);
    })
  }, [])

  return (
    <>

      <ListPanel
        dbList={dbList}
        setNodeKey={setNodeKey}
        listButton={listButton}
        setListButton={setListButton}
      />
      <FocusLock disabled={listButton ? true : false}>
        <ListPanelButton
          listButton={listButton}
          setListButton={setListButton}
        />

        <Routes>
          <Route path="/"
            element={
              <>
                <Header />
                <SearchForm
                  setMovieObject={setMovieObject}
                />
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

          <Route path="/list/:listName" element={
              <Lists
                nodeKey={nodeKey}
                dbList={dbList}
                listButton={listButton}
                setListButton={setListButton}
                setNodeKey={setNodeKey} />

          }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </FocusLock>
    </>
  );
}

export default App;