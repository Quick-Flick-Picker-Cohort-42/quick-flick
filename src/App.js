import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import Results from './Results.js'
import ListPanel from './ListPanel.js';
import Footer from './Footer.js';
import Lists from './Lists.js';
import ErrorPage from './ErrorPage.js'


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
    <>
      <Routes>
        <Route path="/"
          element={
            <>
              <ListPanel
                dbList={dbList}
                setNodeKey={setNodeKey}
              />
              <Header
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
        <Route path="/list/:listName" element={<Lists nodeKey={nodeKey} dbList={dbList}
          setNodeKey={setNodeKey} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;