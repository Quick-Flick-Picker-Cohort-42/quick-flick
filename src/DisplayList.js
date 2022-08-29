import { Link } from 'react-router-dom';


const DisplayList = (({ dbList, handleRemoveList, setNodeKey }) => {
    if (dbList) {
        return (
                    <ul className='listSection'>

                        {/* function that acts like .map but for objects */}
                        {
                            Object.entries(dbList).map(([id, value]) => {
                                return (
                                    <Link to={`/list/${value.listName}`} key={id}>
                                        <li key={id} onClick={() => { setNodeKey(id) }}>
                                            {value.listName}
                                            <button className='deleteList' onClick={() => { handleRemoveList(id) }}>x</button>
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

