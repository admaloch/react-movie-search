import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OmdbItem } from "../../models/ItemApiProps";

interface SearchResponse {
  Search: OmdbItem[];
  totalResults: string;
  Response: string;
}

const BASE_URL = "https://omdbapi.com/";
//@ts-ignore
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const omdbApiSlice = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query<
      SearchResponse,
      { searchInput: string; currTypeParam: string; page?: number }
    >({
      query: ({ searchInput, currTypeParam, page = 1 }) =>
        `?s=${searchInput}&page=${page}&${API_KEY}${currTypeParam}`,
    }),
    getMovieById: builder.query<OmdbItem, string>({
      query: (imdbId) => {
        const queryString = `?i=${imdbId}&plot=full&${API_KEY}`;
        return queryString;
      },
    }),
  }),
});

export const {
  useSearchMoviesQuery,
  useLazySearchMoviesQuery,
  useGetMovieByIdQuery,
  useLazyGetMovieByIdQuery,
} = omdbApiSlice;
