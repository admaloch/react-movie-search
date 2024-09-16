import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
import MovieReviewProps from "../../models/MovieReviewProps";
import { RootState } from "../../app/store";
import { RTKReviewResultInterface } from "../../models/RTKQueryProps";

const reviewsAdapter = createEntityAdapter({})

const initialState = reviewsAdapter.getInitialState()

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => ({
                url: '/reviews',
                validateStatus: (response: Response) => response.status === 200,
            }),
            transformResponse: (responseData: MovieReviewProps[]) => {
                const loadedReviews = responseData.map(review => ({
                    ...review,
                    id: review._id,
                }));
                return reviewsAdapter.setAll(initialState, loadedReviews);
            },
            //@ts-ignore -- look into this issue later
            providesTags: (result: RTKReviewResultInterface) => {
                if (result?.ids) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id })),
                    ];
                } else {
                    return [{ type: 'Review', id: 'LIST' }];
                }
            },
        }),

        getReviewsByUser: builder.query({
            query: (id) => ({
                url: `/reviews/user/${id}`,
                validateStatus: (response: Response) => {
                    return response.status === 200;
                },
            }),
            transformResponse: (responseData: MovieReviewProps[]) => {
                if (Array.isArray(responseData)) {
                    return responseData.map(review => {
                        review.id = review._id;
                        return review;
                    });
                }
            },
            //@ts-ignore -- look into this issue later
            providesTags: (result) => {
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
                validateStatus: (response: Response) => {
                    return response.status === 200;
                },
            }),
            transformResponse: (responseData: MovieReviewProps[]) => {
                // Assuming responseData could be an array of reviews, not a single review.
                if (Array.isArray(responseData)) {
                    return responseData.map(review => {
                        review.id = review._id;
                        return review;
                    });
                }
            },
            //@ts-ignore -- look into this issue later
            providesTags: (result) => {

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
            invalidatesTags: (arg) => [
                { type: 'Review', id: arg.id }
            ]
        }),
        updateReview: builder.mutation({
            query: initialReviewData => ({
                url: `/reviews/${initialReviewData.id}`, // Assuming you pass the review ID to the endpoint
                method: 'PATCH',
                body: initialReviewData
            }),
            invalidatesTags: (arg) => [
                { type: 'Review', id: arg.id } // This invalidates the specific review
            ]
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`, // Include the ID in the URL
                method: 'DELETE'
                // No body needed for DELETE requests
            }),
            invalidatesTags: (arg) => [
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
} = reviewsAdapter.getSelectors((state: RootState) => selectReviewsData(state) ?? initialState)