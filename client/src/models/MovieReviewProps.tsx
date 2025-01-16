export default interface MovieReviewProps {
  body: string;
  id: string;
  imdbId: string;
  rating: string;
  title: string;
  user: {
    _id: string;
    username: string;
  };
  __v: string;
  _id: string;
}
