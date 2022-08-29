import Header from './Header.js';
import Results from './Results.js'
import ListPanel from './ListPanel.js';
import Footer from './Footer.js';

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
    setNodeKey,
}) => {

    return (
        <>
            <Header
                handleMovieInput={handleMovieInput}
                handleSubmit={handleSubmit}
                movieInput={movieInput}
                movieObject={movieObject}
                dbList={dbList}
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
            <Footer />
        </>
    )

})

export default Home;