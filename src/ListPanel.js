import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList, handleRemoveList }) => {
                
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
        
            <DisplayList dbList={dbList} handleRemoveList={handleRemoveList} />

        </div>
    )
}

export default ListPanel;