import useAuth from '../../hooks/useAuth';
import { UserItemProps } from '../../models/UserItemProps';
import { useGetUserByIdQuery } from '../users/usersApiSlice';
import ReviewIcons, { ReviewProps } from './review-icons/ReviewIcons';

interface HandleReviewsProps extends ReviewProps {
  size: number;
}

export default function HandleReviews({ imdbId, title }: HandleReviewsProps): React.JSX.Element | null {
  //test if movie is liked to determine if review icon shows up

  const { id } = useAuth()

  if (!imdbId || !id) return null

  const { data: user, isError, error } = useGetUserByIdQuery(id);

  if (isError) {
    //@ts-ignore
    console.log(`Error: ${error?.data?.message || 'Failed to load content.'}`)
    return null;
  }

  if (!user) return null;

  const typedUser = user as UserItemProps;

  const alreadyLiked = typedUser.likedMovies.find(movie => movie.imdbId === imdbId);
  const alreadyWatched = alreadyLiked ? alreadyLiked.hasWatched : null

  if (!alreadyLiked || !alreadyWatched) return null;

  return <ReviewIcons
    title={title}
    imdbId={imdbId}
  />

}
