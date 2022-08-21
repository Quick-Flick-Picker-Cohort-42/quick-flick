const DisplayList = ( ({ dbList, handleRemoveList }) => {
    if (dbList) {
        return (
            <ul>

                {/* function that acts like .map but for objects */}
                {
                    Object.entries(dbList).map(([key, value]) => {
                        return (
                            <li key={key}>
                                {value.listName}
                                <button onClick={ () => {handleRemoveList(key)}}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
})



export default DisplayList;

