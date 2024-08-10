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


export const omdbApiSlice = createApi({
  reducerPath: 'omdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResponse, { searchInput: string, currTypeParam: string, page?: number }>({
      query: ({ searchInput, currTypeParam, page = 1 }) => 
        `?s=${searchInput}&page=${page}&apikey=${import.meta.env.VITE_OMDB_API_KEY}${currTypeParam}`,
    }),
    getMovieById: builder.query<MovieResponse, string>({
      query: (imdbID) =>
        `?i=${imdbID}&plot=full&apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
    }),
  }),
});


export const { useSearchMoviesQuery, useGetMovieByIdQuery } = omdbApiSlice;
