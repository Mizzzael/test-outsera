import { TMovie } from '@commons/types/TMovie';
import { TCSInterval } from '@commons/types/TCSVData';

const calcMaxInterval = (movies: TMovie[]): TCSInterval[] => {
  if (movies.length < 2) return [];
  const moviesWinner = movies.filter(({ winner }) => winner);
  if (moviesWinner.length < 2) return [];
  const intervals: TCSInterval[] = [];

  movies
    .sort((a, b) => a.year - b.year)
    .forEach((movie, index) => {
      if (index === 0) return;
      const prevMovie: TMovie = movies[index - 1];
      const intervalData: TCSInterval = {
        interval:
          Math.max(movie.year, prevMovie.year) -
          Math.min(movie.year, prevMovie.year),
        yearBegin: Math.min(movie.year, prevMovie.year),
        yearEnd: Math.max(movie.year, prevMovie.year),
        firstMovie: movie.year < prevMovie.year ? movie : prevMovie,
        secondMovie: movie.year > prevMovie.year ? movie : prevMovie,
      };
      intervals.push(intervalData);
    });

  return intervals;
};

export default calcMaxInterval;
