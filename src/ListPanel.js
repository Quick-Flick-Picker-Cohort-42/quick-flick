import DisplayList from './DisplayList';

const ListPanel = ({ handleListInput, list, handleListCreation, dbList, handleRemoveList, setNodeKey }) => {

    return (
        <>
            <input type="checkbox" id="openListPanel"></input>
            <label htmlFor="openListPanel" className="listPanelToggle">
                <div className='spinner diagonal part-1'></div>
                <div className='spinner horizontal'></div>
                <div className='spinner diagonal part-2'></div>
                <div className='listLabel'><h4>movie Lists</h4></div>
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
                        placeholder="Enter list name"
                        className='createList'
                    />
                    <button className='createList'>Create a new list!</button>
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