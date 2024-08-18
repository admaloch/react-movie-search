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
        getReviewById: builder.query({
            query: (id) => {
                // If `id` is provided, use it in the URL; otherwise, default to fetching the current user's reviews
                const url = id ? `/reviews/user/${id}` : `/reviews/user`;
                return {
                    url,
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError;
                    },
                };
            },
            transformResponse: responseData => {
                // Adjust the response data if necessary
                if (Array.isArray(responseData)) {
                    return responseData.map(review => ({
                        ...review,
                        id: review._id
                    }));
                } else {
                    responseData.id = responseData._id;
                    return responseData;
                }
            },
            providesTags: (result, error, arg) =>
                result ?
                    result.map(({ id }) => ({ type: 'Review', id })) :
                    [{ type: 'Review', id: arg }]
        }),
        addNewReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'POST',
                body: {
                    ...initialReviewData,
                }
            }),
            invalidatesTags: [
                { type: 'Review', id: "LIST" }
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
    useGetReviewByIdQuery,
    useLazyGetReviewByIdQuery,
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