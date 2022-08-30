
const Header = ({ handleMovieInput, handleSubmit, movieInput, newMovieInput }) => {


    return (
        <header>
            <h1 className="animate__animated animate__fadeInUp">Quick Flick Picker</h1>
            <p className="animate__animated animate__fadeInUp">Search for a movie, create a personalized movie list, and add movies to it, and then pick your genre and movie length and let us pick a quick flick for you!</p>
            <form action="" onSubmit={handleSubmit} className="animate__animated animate__fadeInUp">
                <label
                    htmlFor="movie-input"
                    className="sr-only"
                >Search for a movie
                </label>
                <input
                    onChange={handleMovieInput}
                    ref={newMovieInput}
                    value={movieInput}
                    type="text"
                    id="movie-input"
                    required
                    placeholder="Search for a movie"
                />
                <button>Find a flick!</button>
            </form>
        </header>
    )
}

export default Header;