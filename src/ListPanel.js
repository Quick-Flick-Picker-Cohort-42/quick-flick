import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList, handleRemoveList, setNodeKey, newListName, movieInput, movieObject }) => {
    
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