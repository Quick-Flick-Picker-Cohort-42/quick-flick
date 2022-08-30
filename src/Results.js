import { useState } from 'react';
import Modal from './Modal.js';



const Results = ({ movieObject, dbList, toSend, setToSend, setListSelection, listSelection }) => {
  //on button click, take the information from that movie and send it to the list section
  const [modal, setModal] = useState(false);

  const toggleModal = (movie) => {
    setModal(!modal);
    setToSend(movie)
  }

  if (modal) {
    document.body.classList.add('activeModal')
  } else {
    document.body.classList.remove('activeModal')
  }

  return (
    <section>
      <div className="movieWrapper">
        {movieObject.map((movie) => {
          console.log(movie)
          return (
            <div className="movieContainer" key={movie.id}>
            
              <div className="moviePoster">
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '../noMoviePoster.png'} alt={`A poster of the movie ${movie.original_title}`} />
              </div>

              <div className="movieInformation">
                <h2>{movie.original_title}</h2>
                {movie.credits.crew.length !== 0 ? <p>Directed by: {movie.credits.crew.map((crewMember) => {
                  if (crewMember.department === "Directing") {
                    return (
                      <p key={crewMember.id}> {crewMember.name}</p>
                    )
                  } else {
                    return null
                  }
                })}</p> : null}

                {movie.credits.cast.length !== 0 ? <p>Cast: {movie.credits.cast.map((castMember, index) => {
                  if (index < 4) {
                    return (
                      <span key={castMember.credit_id}>{castMember.name}, </span>
                    )
                  } else if (index === 5) {
                    return (
                      <span key={castMember.credit_id}>{castMember.name}</span>
                    )
                  } else {
                    return null
                  }
                })}</p> : null}
                {/* {movie.videos} */}
                <p>{movie.overview}</p>
                <p><span>Release Date: </span>{movie.release_date}</p>
                <button className="addMovie" onClick={() =>
                  toggleModal(movie)} >Add this Movie</button>
              </div>
              {
                modal
                  ?
                  <Modal
                    dbList={dbList}
                    toggleModal={toggleModal}
                    toSend={toSend}
                    setListSelection={setListSelection}
                    listSelection={listSelection} />
                  :
                  null
              }
            </div>

          )


        })}
      </div>
    </section>

  )
}

export default Results;