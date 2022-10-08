import DisplayList from './DisplayList';
import { useState } from 'react';
import { getDatabase, ref, remove, push } from 'firebase/database';
import firebase from './firebase';

const ListPanel = ({ dbList, setNodeKey, listName }) => {

    //!states
    // tracks and stores user's list name input (when creating new list)
    const [list, setList] = useState({ listName: '' });

    // handle list input
    const handleListInput = ((e) => {
        setList(current => {
            return { ...current, listName: e.target.value }
        });
    })

    // creates the list in firebase
    const handleListCreation = ((e) => {
        e.preventDefault()
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        if (dbList) {
            const listArray = Object.values(dbList).map((listObject) => {
                return listObject.listName
            })
            if (listArray.includes(list.listName.toLowerCase()) || (listArray.includes(list.listName.toUpperCase()))) {
                alert('There is already a list with this name!')
            } else {
                push(dbRef, list)
            }
        } else {
            push(dbRef, list)
        }
        // empty out input so that new list name can be entered
        setList({ listName: '' })
    })

    const handleRemoveList = (node) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${node}`);
        remove(dbRef);
        setNodeKey('');
    }    

    return (
        <>
            <input type="checkbox" id="openListPanel"></input>
            <label htmlFor="openListPanel" className="listPanelToggle">
                <div className='spinnerBackground'></div>
                <div className='spinner diagonal part-1'></div>
                <div className='spinner horizontal'></div>
                <div className='spinner diagonal part-2'></div>
                <div className='listLabel'><h4>Movie Lists</h4></div>
            </label>

            <div className='listPanel'>
                <form
                    className='listSection'
                    onSubmit={handleListCreation}
                >
                    <label
                        htmlFor="list-input"
                        className="sr-only"
                    >
                        Enter a name for your list
                    </label>
                    <input
                        onChange={handleListInput}
                        value={list.listName}
                        type="text"
                        id="list-input"
                        required
                        maxLength='20'
                        placeholder="Enter List Name"
                        className='createList'
                    />
                    <button className='createList'>Add List</button>
                </form>

                <DisplayList
                    dbList={dbList}
                    handleRemoveList={handleRemoveList}
                    setNodeKey={setNodeKey}
                />

            </div>
        </>
    )
}

export default ListPanel;