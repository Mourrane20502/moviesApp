// MovieProd.tsx
import React from 'react';

interface MovieProdProps {
  title: string;
  poster: string;
  year: string;
  imdbID: string;
}

const MovieProd: React.FC<MovieProdProps> = ({ title, poster, year, imdbID }) => {
  return (
    <div key={imdbID} className="movie-card">
      <img
        src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/150'}
        alt={title}
        className="movie-poster"
      />
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
};

export default MovieProd;
