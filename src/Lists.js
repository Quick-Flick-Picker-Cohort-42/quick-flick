import { useParams } from 'react-router-dom';

const Lists = ({ nodeKey, dbList }) => {

  const { listName } = useParams();
  console.log(dbList)
  return (

    <section className="">
      
      <h2>{listName}</h2>
      {/* pass in lists as link url in displayList component, and dynamically render the unique list names and movie object titles (map), based on the key that was selected (ie list key) */}
    </section>

  )
}

// probably going to need to nest user generated list components inside this component and then route it on click, and then in those lists, send my movie data to this section here

export default Lists;