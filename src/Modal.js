const Modal = ({ dbList }) => {
    return (
        <div className="modal">
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
        </div>
    )
}

export default Modal; 