import { Link } from 'react-router-dom';
import Header from './Header.js';
import Results from './Results.js'
import ListPanel from './ListPanel.js';

const Home = (({
    handleMovieInput,
    handleSubmit,
    movieInput,
    movieObject,
    dbList,
    toSend,
    setToSend,
    setListSelection,
    listSelection,
    handleListInput,
    list,
    handleListCreation,
    handleRemoveList, 
    setNodeKey
}) => {

    return (
        <>
            <Link to="/lists">Take me to your list</Link>
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
            <ListPanel
                handleListInput={handleListInput}
                list={list}
                handleListCreation={handleListCreation}
                dbList={dbList}
                handleRemoveList={handleRemoveList}
                setNodeKey={setNodeKey}
            />
        </>
    )

})

export default Home;