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
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                const loadedReviews = responseData.map(review => {
                    review.id = review._id;
                    return review;
                });
                return reviewsAdapter.setAll(initialState, loadedReviews);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id }))
                    ];
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
              
                if (Array.isArray(responseData)) {
                    return responseData.map(review => {
                        review.id = review._id;
                        return review;
                    });
                } else {
                    responseData.id = responseData._id;
                    return responseData;
                }
            },
            providesTags: (result, error, arg) => {
                // This assumes the response is an array of reviews
                if (result?.length) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.map(({ id }) => ({ type: 'Review', id }))
                    ];
                } else {
                    return [{ type: 'Review', id: 'LIST' }];
                }
            }
        }),
        
        getReviewsByMovie: builder.query({
            query: (id) => ({
                url: `/reviews/movie/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: responseData => {
                // Assuming responseData could be an array of reviews, not a single review.
                if (Array.isArray(responseData)) {
                    return responseData.map(review => {
                        review.id = review._id;
                        return review;
                    });
                } else {
                    // If a single review is returned (less common for this use case)
                    responseData.id = responseData._id;
                    return responseData;
                }
            },
            providesTags: (result, error, arg) => {
                if (result?.length) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.map(({ id }) => ({ type: 'Review', id }))
                    ];
                } else {
                    return [{ type: 'Review', id: 'LIST' }];
                }
            }
        }),
        
        addNewReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'POST',
                body: initialReviewData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
        updateReview: builder.mutation({
            query: initialReviewData => ({
                url: `/reviews/${initialReviewData.id}`, // Assuming you pass the review ID to the endpoint
                method: 'PATCH',
                body: initialReviewData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: arg.id } // This invalidates the specific review
            ]
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`, // Include the ID in the URL
                method: 'DELETE'
                // No body needed for DELETE requests
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Review', id: 'LIST' }, // Optionally invalidate the entire list
                { type: 'Review', id: arg } // Invalidate the specific review
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