import Header from './Header.js';
import Results from './Results.js'
import ListPanel from './ListPanel.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';

const Home = (({
    handleMovieInput,
    handleSubmit,
    movieInput,
    dbList,
    toSend,
    setToSend,
    setListSelection,
    listSelection,
    setNodeKey
}) => {

    // stores API movie results
    const [movieObject, setMovieObject] = useState([]);

    useEffect(() => {
        setMovieObject([]);
    }, [])

    return (
        <>
            <Header
                handleMovieInput={handleMovieInput}
                handleSubmit={handleSubmit}
                movieInput={movieInput}
                movieObject={movieObject}
                dbList={dbList}
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
            <ListPanel
                dbList={dbList}
                setNodeKey={setNodeKey}
            />
            <Footer />
        </>
    )

})

export default Home;