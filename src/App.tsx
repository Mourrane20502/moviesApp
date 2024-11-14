// App.tsx
import './App.css'
import { useState, useEffect } from 'react'
import MovieProd from './components/MovieProd';
function App() {
  const API_URL = "http://www.omdbapi.com?apikey=a07fe867";
  
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (title: string) => {
    setLoading(true);
    setError('');
    const response = await fetch(`${API_URL}&s=${title}`);
    
    if (response.ok) {
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError('No movies found');
      }
    } else {
      setError('Failed to fetch data');
    }
    setLoading(false);
  }

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  useEffect(() => {
    searchMovies('Spiderman'); // default search
  }, []);

  return (
    <>
      <div className='main'>
        <h1>Movies Kingdom</h1>
        <div className='flex'>
          <input
            type="text"
            placeholder='Movie Name ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleEnterPress} // Allow search on Enter key press
          />
          <button onClick={handleSearch}>SEARCH</button>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p className="error">{error}</p>}

        <div className="movies-container">
          {movies.length > 0 ? (
            movies.map((movie: any) => (
              <MovieProd
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                year={movie.Year}
                imdbID={movie.imdbID}
              />
            ))
          ) : (
            !loading && <p>No movies to display</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
