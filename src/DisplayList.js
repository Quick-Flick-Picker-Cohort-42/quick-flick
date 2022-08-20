const DisplayList = ( ({dbList}) => {
    if (dbList) {
        return (
            <ul>

                {/* fucntion that acts like .map but for objects */}
                {
                    Object.entries(dbList).map(([key, value]) => {
                        return (
                            <li key={key}>
                                {value.listName}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
})

export default DisplayList;