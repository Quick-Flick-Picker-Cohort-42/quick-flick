import './styles/App.css';
import firebase from './components/firebase.js';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Lists from './components/Lists.js';
import ErrorPage from './components/ErrorPage.js'


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

  useEffect(() => {
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
        <Route path="/" element={
          <Home
            dbList={dbList}
            toSend={toSend}
            setToSend={setToSend}
            setListSelection={setListSelection}
            listSelection={listSelection}
            setNodeKey={setNodeKey}
          />}
        />
        <Route path="/list/:listName" element={<Lists nodeKey={nodeKey} dbList={dbList}
          setNodeKey={setNodeKey} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;