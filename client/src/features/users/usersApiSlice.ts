import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ];
                } else {
                    return [{ type: 'User', id: 'LIST' }];
                }
            }
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                // Adjust the response data if necessary
                responseData.id = responseData._id;
                return responseData;
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: arg }
            ]
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: `/users/${initialUserData.id}`, // Assuming you pass the user ID to the endpoint
                method: 'PATCH',
                body: initialUserData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id } // This invalidates the specific user
            ]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`, // Include the ID in the URL
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: 'LIST' }, // Optionally invalidate the entire list
                { type: 'User', id: arg } // Invalidate the specific user
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select('usersList');

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => {
        const data = usersResult.data;
        return data;
    }
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)