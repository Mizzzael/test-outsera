import { TMovie } from '@commons/types/TMovie';

export type TCSVRow = {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
};

export type TCSInterval = {
  interval: number;
  yearBegin: number;
  yearEnd: number;
  firstMovie: TMovie;
  secondMovie: TMovie;
};

export type TCSVData = {
  producer: string;
  movies: TMovie[];
  winsInterval?: TCSInterval[];
};
