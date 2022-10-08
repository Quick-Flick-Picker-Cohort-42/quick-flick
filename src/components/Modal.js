import firebase from './firebase';
import { push, ref, getDatabase } from 'firebase/database';


const Modal = ({ dbList, toggleModal, toSend, setListSelection, listSelection }) => {

    // update sendMovie state with the selected movie
    const handleListSelection = (e) => {
        setListSelection(e.target.value);
    }

    // update sendMovie state with the selected movie and send to firebase
    const handleAddMovie = (e) => {
        e.preventDefault();
        // if user tries to submit without selecting list, create an alert
        if (!listSelection) {
            alert('Please select a list to add your movie to!')
        } else {
            for (let listNode in dbList) {
                // if the name of the list in Firebase matches the name of the list selected by user, check whether the user has already added the movie to this list. If yes, create an alert; otherwise, push the movie to Firebase
                if (dbList[listNode].listName === listSelection) {
                    const database = getDatabase(firebase);
                    const dbRefNode = ref(database, `/${listNode}/movies`);
                    // store the Firebase movies object in a variable and create an empty array
                    if (dbList[listNode].movies) {
                        const movieObjects = (dbList[listNode].movies);
                        // map over the movie objects and push the existing movie ids to the new movieIdArray
                        const movieIdArray = Object.values(movieObjects).map((movieObject) => {
                            return movieObject.id
                        });
                        if (movieIdArray.includes(toSend.id)) {
                            // if the array of existing movie ids includes the id of the movie currently selected by the user, let user know they've already added this movie to the list 
                            alert(`You have already added ${toSend.original_title} to this list!`)
                        } else {
                            // push movie to firebase and close the modal
                            push(dbRefNode, toSend)
                            toggleModal()
                        }
                    }
                    else {
                        // there are no movies in this list, so push the movie to firebase and close the modal 
                        push(dbRefNode, toSend)
                        toggleModal()
                    }
                }
            }
        }
    }

    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modalContent">
                <h3>Add this Movie: </h3>
                <div className="modalContentContainer">
                    <h3>{toSend.original_title}</h3>
                    <img src={toSend.poster_path ? `https://image.tmdb.org/t/p/w200${toSend.poster_path}` : './noMoviePosterFound.png'} alt={`A poster of the movie ${toSend.original_title}`} />
                </div>

                <form>
                    <label htmlFor="list">Save movie to list:</label>

                    <select
                        id="list"
                        name="list"
                        required
                        onChange={handleListSelection}
                        value={listSelection}
                    >
                        <option disabled value="">Select a list</option>
                        {
                            Object.entries(dbList).map(([key, value]) => {
                                return (
                                    <option key={key} value={value.listName}>
                                        {value.listName}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button onClick={(e) => { handleAddMovie(e) }}>Add to list</button>
                </form>
                <button className="modalClose" onClick={toggleModal}>X</button>
            </div>
        </div>

    )
}

export default Modal;