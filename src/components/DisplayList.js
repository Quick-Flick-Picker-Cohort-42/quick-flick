import { Link } from 'react-router-dom';


const DisplayList = (({ dbList, handleRemoveList, setNodeKey }) => {
    if (dbList) {
        return (
            <ul className='listSection'>
                {
                    Object.entries(dbList).map(([id, value]) => {
                        return (
                            <li key={id}>
                                <Link to={`/list/${value.listName}`}>
                                    {value.listName}
                                </Link>
                                <button className='deleteList' onClick={() => { handleRemoveList(id) }}>
                                    <div>x</div>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
})



export default DisplayList;

