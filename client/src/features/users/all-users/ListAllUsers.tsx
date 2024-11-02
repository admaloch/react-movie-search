import { useGetUsersQuery } from '../usersApiSlice'
import Error from '../../../components/UI/errors/Error'
import './User.css'
import User from './User'

export default function ListAllUsers() {
    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true, // or set to false if you don't need it
        refetchOnMountOrArgChange: false, // avoid refetching on every mount
    });

    //@ts-ignore
    if (isError ) return <Error text={'Something went wrong. Check your internet connection and try again.'} />

    if (!users) return null

    const usersIds = users.ids as string[]

    return (
        <main className="main-item-content all-users-section">

            <h1>All Users:</h1>
            <div className="user-list">
                {usersIds.map(id => <User key={id} userId={id} isLoading={isLoading} />)}
            </div>

        </main>
    );
}
