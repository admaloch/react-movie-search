export interface UserItemProps {
  email: string;
  id: string;
  isAdmin: boolean;
  likedMovies: LikedUserMovies[];
  reviews: [];
  username: string;
  __v: string;
  _id: string;
}

export interface LikedUserMovies {
  hasWatched: boolean;
  imdbId: string;
  title: string;
  type: string;
  _id: string;
}
