import firebase from './firebase';
import { update, set, push, ref, getDatabase } from 'firebase/database';

const Modal = ({ movie, dbList, toggleModal, setSendMovie, setListSelection, listSelection }) => {
    
    // update sendMovie state with the selected movie
    const handleListSelection = (e) => {
        setListSelection(e.target.value);
    }

    // update sendMovie state with the selected movie and send to firebase
    const handleAddMovie = (e, movie, dbList) => {
        e.preventDefault();
        if (!listSelection) {
            alert('Please select a list')
        } else {
        setSendMovie(movie);
        }

        // const database = getDatabase(firebase);
        // const dbRefNode = ref(database, `/${}`);

        // update(dbRefNode, sendMovie)
    }

    { const nodeKey = '' }

    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                <h1>Add this Movie: </h1>
                <form>
                    <label htmlFor="list">Save movie to list:</label>
                    <select id="list" name="list" required onChange={handleListSelection} value={listSelection}>
                        <option disabled value={'default'} >Select a list</option>
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
                    <button onClick={(e) => {handleAddMovie(e, movie)}}>Add to list</button>
                </form>
                <button className="modal-close" onClick={toggleModal}>X</button>
            </div>
        </div>
    )
}

export default Modal;