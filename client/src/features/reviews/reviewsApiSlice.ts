import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const reviewsAdapter = createEntityAdapter({})

const initialState = reviewsAdapter.getInitialState()

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => ({
                url: '/reviews',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            //The transformResponse function modifies the response data before it’s stored in the Redux store.
            transformResponse: responseData => {
                const loadedReviews = filteredReviews.map(review => {
                    review.id = review._id;
                    return review;
                });
                return reviewsAdapter.setAll(initialState, loadedReviews);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    const tags = [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id }))
                    ];

                    return tags;
                } else {
                    return [{ type: 'Review', id: 'LIST' }];
                }
            }

        }),
        getReviewsByUser: builder.query({
            query: (id) => ({
                url: `/reviews/user/${id}`,
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
                { type: 'Review', id: arg.id }
            ]
        }),
        getReviewsByMovie: builder.query({
            query: (id) => ({
                url: `/reviews/movie/${id}`,
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
                { type: 'Review', id: arg.id }
            ]
        }),
        addNewReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'POST',
                body: {
                    ...initialReviewData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
        updateReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'PATCH',
                body: {
                    ...initialReviewData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `/reviews`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetReviewsQuery,
    useGetReviewsByUserQuery,
    useGetReviewsByMovieQuery,
    useLazyGetReviewsByUserQuery,
    useAddNewReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApiSlice

// returns the query result object
export const selectReviewsResult = reviewsApiSlice.endpoints.getReviews.select('reviewsList');

// creates memoized selector
const selectReviewsData = createSelector(
    selectReviewsResult,
    reviewsResult => {
        const data = reviewsResult.data;
        return data;
    }
);


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
    selectIds: selectReviewIds
    // Pass in a selector that returns the reviews slice of state
} = reviewsAdapter.getSelectors(state => selectReviewsData(state) ?? initialState)