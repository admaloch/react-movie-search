import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"
import MovieReviewProps from "../../models/MovieReviewProps";

interface ReviewsResponse {
    reviews: MovieReviewProps[];
}

interface FetchBaseQueryError {
    status: number;
    data?: {
        isError: boolean;
    };
}

const reviewsAdapter = createEntityAdapter<MovieReviewProps>()

const initialState = reviewsAdapter.getInitialState()

// Type guard to check if result is an error
const isFetchBaseQueryError = (result: any): result is FetchBaseQueryError => {
    return (result as FetchBaseQueryError).data?.isError !== undefined;
};

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => ({
                url: '/reviews',
                validateStatus: (response: Response, result: ReviewsResponse | FetchBaseQueryError) => {
                    if (isFetchBaseQueryError(result)) {
                        return response.status === 200 && !result.data?.isError;
                    }
                    return response.status === 200;
                },
            }),
            transformResponse: (responseData: ReviewsResponse) => {
                // Access the reviews array in responseData
                const loadedReviews = responseData.reviews.map((review) => {
                    return {
                        ...review,
                        id: review._id, // Map _id to id
                    };
                });
                return reviewsAdapter.setAll(initialState, loadedReviews);
            },
            providesTags: (result: ReviewsResponse | undefined) => {
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
                validateStatus: (response: Response, result: ReviewsResponse | FetchBaseQueryError) => {
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