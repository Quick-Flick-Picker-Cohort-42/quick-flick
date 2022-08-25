import firebase from './firebase';
import { push, ref, getDatabase } from 'firebase/database';

const Modal = ({ dbList, toggleModal, toSend, setToSend, setListSelection, listSelection }) => {

    // update sendMovie state with the selected movie
    const handleListSelection = (e) => {
        setListSelection(e.target.value);

    }

    // update sendMovie state with the selected movie and send to firebase
    const handleAddMovie = (e, movie) => {
        e.preventDefault();

        if (!listSelection) {
            alert('Please select a list')

        } else {
            for (let listNode in dbList) {
                if (dbList[listNode].listName === listSelection) {
                    const database = getDatabase(firebase);
                    const dbRefNode = ref(database, `/${listNode}/movies`);
                    
                    push(dbRefNode, toSend)
                }
            }
        }
    }

    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                <h1>Add this Movie: </h1>
                <form>
                    <label htmlFor="list">Save movie to list:</label>
                    {/* WEIRD QUIRK: if you want a unselectable default option as your first choice in a select, add attr value='' */}
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
                    <button onClick={(e) => { handleAddMovie(e, toSend) }}>Add to list</button>
                </form>
                <button className="modal-close" onClick={toggleModal}>X</button>
            </div>
        </div>

    )
}

export default Modal;