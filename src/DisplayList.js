import { Link } from 'react-router-dom';


const DisplayList = (({ dbList, handleRemoveList, setNodeKey }) => {
    if (dbList) {
        return (
                    <ul className='listSection'>

                        {/* function that acts like .map but for objects */}
                        {
                            Object.entries(dbList).map(([id, value]) => {
                                return (
                                    <li key={id} onClick={() => { setNodeKey(id) }}>
                                        <Link to={`/list/${value.listName}`}>
                                            {value.listName}
                                        </Link>
                                        <button className='deleteList' onClick={() => { handleRemoveList(id) }}>x</button>
                                    </li>
                                )
                            })
                        }
                    </ul>        
        )
    }
})



export default DisplayList;

