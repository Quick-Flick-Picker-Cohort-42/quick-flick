import { useState } from 'react';
import Modal from './Modal.js';


const Results = ({ movieObject, addMovie, dbList, setSendMovie, setListSelection, listSelection }) => {
  //on button click, take the information from that movie and send it to the list section
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <section>
      <div>
        <h2>Results</h2>
        {movieObject.map((movie) => {
          return (
            <div className="movieContainer" key={movie.id}>

              <div className="moviePoster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`A poster of the movie ${movie.original_title}`} />
                <button className="addMovie" onClick={
                  // addMovie
                  toggleModal}>Add this Movie</button>
              </div>

              <div className="movieInformation">
                <h2>{movie.original_title}</h2>
                <h3>Description</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
              </div>
              {modal ? <Modal movie={movie} dbList={dbList} toggleModal={toggleModal} setSendMovie={setSendMovie} setListSelection={setListSelection} listSelection={listSelection} /> : null}
            </div>
          )

        })}
      </div>
    </section>

  )
}

export default Results;