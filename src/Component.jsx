import axios from "axios";
import { useState } from "react";

function Container() {
    const [change, setChange] = useState("");
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]); 

    function handleChange(e) {
        setChange(e.target.value); 
    }

    async function handleSearch() {
        if (!change.trim()) {
            setError("Please enter a search term");
            setMovies([]); 
            return setError;
        }

        try {
            const apiKey = '54760c80fea6e93b701efa219c8575bf';
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(change)}`;

            const response = await axios.get(url);
            const results = response.data.results;

            if (results.length === 0) {
                setMovies([]);
                setError("No Movies available");
            } 
            else {
                setMovies(results);
                setError(null);
            }
        } 
        catch {
            setMovies([]);
            setError("An error occurred while fetching movies");
        }
    }

    return (
        <div className="mainly">
        <div className="main">
            <h1 className="movie">Movie Finder</h1>
            <input
                className="input"
                placeholder="Type Here"
                value={change}
                onChange={handleChange}
            />
            <button className="search" onClick={handleSearch}>Search</button>

            {error && <p className="error">{error}</p>}
            {movies.length > 0 && (
                <div className="list">
                    {movies.map((movie) => (
                        <div className="inside">
                            <h2 className="title">{movie.title}</h2>
                            <p className="release">Release Date: {movie.release_date}</p>
                            <p className="overview">Overview: {movie.overview}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default Container;
