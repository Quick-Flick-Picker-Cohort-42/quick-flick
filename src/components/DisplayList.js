import { Link } from 'react-router-dom';
import firebase from '../firebase';
import { getDatabase, ref, remove } from 'firebase/database';




const DisplayList = (({ dbList, setNodeKey }) => {

    const handleRemoveList = (node) => {
        if (window.confirm('Are you sure you want to delete this movie list?')) {
            const database = getDatabase(firebase);
            const dbRef = ref(database, `/${node}`);
            remove(dbRef);
            setNodeKey('');
        } else { 
            return null
        }
    }


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

