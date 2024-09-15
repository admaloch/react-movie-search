import { useGetUsersQuery } from '../usersApiSlice'
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation'
import Error from '../../../components/UI/errors/Error'
import './User.css'
import User from './User'

export default function ListAllUsers() {
    const {
        data: users,
        isLoading,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true, // or set to false if you don't need it
        refetchOnMountOrArgChange: false, // avoid refetching on every mount
    });

    if (isLoading) return <CircleAnimation />;

    //@ts-ignore
    if (isError ) return <Error text={`Error: ${error.data.message}. Check your internet connection and try again.`} />

    const usersIds = users.ids as string[]

    return (
        <div className="main-item-content all-users-section">

            <h2>All Users:</h2>
            <div className="user-list">
                {usersIds.map(id => <User key={id} userId={id} />)}
            </div>

        </div>
    );
}
