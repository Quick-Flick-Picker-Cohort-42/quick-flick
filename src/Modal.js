

const Modal = ({ movie, dbList, toggleModal }) => {
    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                <h1>Add this Movie: </h1>
                <form>
                    <label htmlFor="list">Save movie to list:</label>
                    <select id="list" name="list" required>
                        {
                            Object.entries(dbList).map(([key, value]) => {
                                return (
                                    <option key={key}>
                                        {value.listName}
                                    </option>
                                )
                            })
                        }
                    </select>
                </form>
                <button>Add to list</button>
                <button className="modal-close" onClick={toggleModal}>X</button>
            </div>
        </div>
    )
}

