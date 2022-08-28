import { useEffect } from 'react';
import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList, handleRemoveList, setNodeKey, newListName, movieInput }) => {

    useEffect (() => {
        // empty out input so that new list names can be added
        const newListNameInput = newListName.current;
        newListNameInput.value = '';
    }, [dbList, newListName, movieInput])
    
    return (
        <div>
            <form 
                action="" 
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
                    ref={newListName}
                    type="text" 
                    id="list-input"
                    required 
                    placeholder="Enter list name"
                />
                <button >Create new list</button>
            </form>
        
            <DisplayList 
                dbList={dbList} 
                handleRemoveList={handleRemoveList} 
                setNodeKey={setNodeKey}
            />

        </div>
    )
}

export default ListPanel;