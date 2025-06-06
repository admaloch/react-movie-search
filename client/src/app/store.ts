import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import searchTypeReducer from "../features/search-options/SearchTypeSlice";
import omdbStateReducer from "../features/movie-api/omdbSlice";
import { omdbApiSlice } from "../features/movie-api/omdbApiSlice";

//@ts-ignore
const nodeEnvironment = import.meta.env.VITE_NODE_ENV;

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [omdbApiSlice.reducerPath]: omdbApiSlice.reducer,
    auth: authReducer,
    searchTypes: searchTypeReducer,
    omdbState: omdbStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, omdbApiSlice.middleware),
  devTools: nodeEnvironment === "development" ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
