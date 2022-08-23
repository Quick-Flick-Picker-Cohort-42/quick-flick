const Lists = () => {
  return (
    <section className="">
      <h1>Lists Section</h1>
      {/* pass in lists as link url in displayList component, and dynamically render the unique list names and movie object titles (map), based on the key that was selected (ie list key) */}
    </section>

  )
}

// probably going to need to nest user generated list components inside this component and then route it on click, and then in those lists, send my movie data to this section here

export default Lists;