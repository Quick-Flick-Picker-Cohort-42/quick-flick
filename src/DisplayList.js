import { Link } from 'react-router-dom';

const DisplayList = (({ dbList, handleRemoveList }) => {
    if (dbList) {
        return (
            <ul>

                {/* function that acts like .map but for objects */}
                {
                    Object.entries(dbList).map(([key, value]) => {
                        return (
                            <Link to={`/${key}`}>
                                <li key={key}>
                                    {value.listName}
                                    <button onClick={() => { handleRemoveList(key) }}>x</button>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        )
    }
})



export default DisplayList;

