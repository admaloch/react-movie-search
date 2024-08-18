import useAuth from '../../../hooks/useAuth';

export default function CreateReviewIcon({}) {
  const { id } = useAuth()
    
  if (!id) return null

  const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);
  
  return (
    <div>CreateReviewIcon</div>
  )
}
