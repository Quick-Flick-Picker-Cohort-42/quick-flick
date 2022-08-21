const Results = ({movieObject, addMovie}) => {


//on button click, take the information from that movie and send it to the list section




  return (
    <section>
      <div>
        <h2>Results</h2>
        {movieObject.map( (movie) => {
          return(
            <div className="movieContainer" key={movie.id}>

              <div className="moviePoster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`A poster of the movie ${movie.original_title}`} />
                <button className="addMovie" onClick={ (e) => addMovie(e, movie)}>Add this Movie</button>
              </div>

              <div className="movieInformation">
                <h3>Description</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
              </div>

            </div>
          )

        })}
      </div>
    </section>

  )
}

export default Results;