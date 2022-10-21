import DisplayList from './DisplayList';
import { useState } from 'react';
import { getDatabase, ref, remove, push } from 'firebase/database';
import firebase from './firebase';

const React = require('react');
const ListPanel = React.forwardRef(({ dbList, setNodeKey, listButton, setListButton }) => {

    //!states
    // tracks and stores user's list name input (when creating new list)
    const [list, setList] = useState({ listName: '' });

    // // click the button to set the state to change horizontal bars
    // const [listButton, setListButton] = useState(false);


    // handle list input
    const handleListInput = ((e) => {
        setList(current => {
            return { ...current, listName: e.target.value }
        });
    })

    const openListPanel = () => {
        listButton ? setListButton(false) : setListButton(true)
    }

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
        <div ref={ref}>
            {/* when listButton is clicked, change horizontal bars */}
            <button className='listPanelToggle' onClick={openListPanel}>
                <div className={listButton ? 'line1Active spinner diagonal part-1' : 'spinner diagonal part-1'}></div>
                <div className={listButton ? 'diagonalActive spinner horizontal' : 'spinner horizontal'}></div>
                <div className={listButton ? 'line2Active spinner diagonal part-2' : 'spinner diagonal part-2'}></div>
                <div className='listLabel'><h4>movie Lists</h4></div>
            </button>

            <div className={listButton ? 'listPanel panelActive' : 'listPanel'} tabIndex={listButton ? 0 : -1}>
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
                        placeholder="Enter list name"
                        className='createList'
                    />
                    <button className='createList'>Create a new list!</button>
                </form>

                <DisplayList
                    dbList={dbList}
                    handleRemoveList={handleRemoveList}
                />

            </div>
        </div>
    )
})

export default ListPanel;