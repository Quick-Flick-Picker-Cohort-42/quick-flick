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
    setNodeKey,
    newListName,
    newMovieInput,
}) => {

    return (
        <>
            <Header
                handleMovieInput={handleMovieInput}
                handleSubmit={handleSubmit}
                movieInput={movieInput}
                newMovieInput={newMovieInput}
                movieObject={movieObject}
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
                newListName={newListName}
                movieInput={movieInput}
            />
        </>
    )

})

export default Home;