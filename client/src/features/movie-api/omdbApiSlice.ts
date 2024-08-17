import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSearchType } from '../../hooks/useSearchType'; // Import your custom hook

interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  // Add more fields as needed
}

interface SearchResponse {
  Search: MovieResponse[];
  totalResults: string;
  Response: string;
}

const BASE_URL = 'https://omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY


export const omdbApiSlice = createApi({
  reducerPath: 'omdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResponse, { searchInput: string, currTypeParam: string, page?: number }>({
      query: ({ searchInput, currTypeParam, page = 1 }) =>
        `?s=${searchInput}&page=${page}&${API_KEY}${currTypeParam}`,
    }),
    getMovieById: builder.query<MovieResponse, string>({
      query: ( imdbId ) => {
        const queryString = `?i=${imdbId}&plot=full&${API_KEY}`;
        return queryString;
      },
    }),
  }),
});
// https://omdbapi.com/?i=tt0105624&plot=full&apikey=84200d7a

export const { useSearchMoviesQuery, useLazySearchMoviesQuery, useGetMovieByIdQuery, useLazyGetMovieByIdQuery } = omdbApiSlice;
