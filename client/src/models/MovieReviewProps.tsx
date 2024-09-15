export default interface MovieReviewProps {
    body: string;
    id: string;
    imdbId: string;
    rating: string;
    title: string;
    user: MovieReviewUserProps;
    __v: string;
    _id: string;
}

interface MovieReviewUserProps {
    _id: string;
    username: string;
}