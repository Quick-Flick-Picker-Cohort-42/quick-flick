import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList, handleRemoveList, setNodeKey }) => {
                
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
                    type="text" 
                    id="list-input" 
                    placeholder="e.g., Movies to make me seem cultured"
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