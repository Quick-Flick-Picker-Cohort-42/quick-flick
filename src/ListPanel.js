import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList}) => {
                
    return (
        <div>
            <form 
                action="" 
                onSubmit={handleListCreation}
            >
                <label 
                    htmlFor="list-input" 
                    className="sr-only"
                    >Enter list name
                </label>
                <input 
                    onChange={handleListInput} 
                    value={list.listName}
                    type="text" 
                    id="list-input" 
                    placeholder="Enter list name"
                />
                <button >Create new list</button>
            </form>
        
            <DisplayList dbList={dbList}/>
      
        </div>
    )
}

// in Make List Component:
// CHECK - A user text input for naming a new list
// CHECK - A button for adding a list.
// CHECK - On changing input field, setlist()
// CHECK - On submit, handleListCreation() function pushes listState to firebase.
// - underneath, a div holding all the user made lists
// - onValue change, setdbList() gets all the lists from firebase and sends to modal pop up component (this contains the LIST unique IDs). Update div.list with all the lists user made (suggestion: listen for a sibling node instead?). 

export default ListPanel;