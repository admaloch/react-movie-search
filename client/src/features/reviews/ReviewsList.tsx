import { useGetReviewsQuery } from "./reviewsApiSlice"
import Review from "./Review"

const ReviewsList = () => {
    const {
        data: reviews,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReviewsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = reviews

        const tableContent = ids?.length
            ? ids.map(reviewId => <Review key={reviewId} reviewId={reviewId} />)
            : null

        content = (
            <table className="table table--reviews">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th review__status">Username</th>
                        <th scope="col" className="table__th review__created">Created</th>
                        <th scope="col" className="table__th review__updated">Updated</th>
                        <th scope="col" className="table__th review__title">Title</th>
                        <th scope="col" className="table__th review__username">Owner</th>
                        <th scope="col" className="table__th review__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ReviewsList