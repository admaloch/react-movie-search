import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'
import { RootState } from '../store';

//@ts-ignore
const nodeEnvironment = import.meta.env.VITE_NODE_ENV

const url = nodeEnvironment === 'development' ? 'http://localhost:3500' : 'https://movie-brain-api.onrender.com'


const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    //@ts-ignore - return to type issue later
    prepareHeaders: (headers, { getState }: { getState: () => RootState }) => {
        const token = getState().auth.token; // Access token from auth slice
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api: BaseQueryApi,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    // If we get a 403 response, attempt to refresh the token
    if (result?.error?.status === 403) {
        console.log('sending refresh token');

        // Send refresh token request to get a new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            // Store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }));

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If the refresh also fails, return the error
            if (refreshResult?.error?.status === 403) {
                (refreshResult.error.data as any).message = 'Your login has expired.';
            }
            return refreshResult;
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Review', 'User'],
    endpoints: () => ({}) 
});