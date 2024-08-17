import { useGetUsersQuery } from '../usersApiSlice'
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation'
import Error from '../../../components/UI/errors/Error'
import './User.css'
import User from './User'

export default function ListAllUsers() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    // console.log("Users data in ListAllUsers:", users); // Log users data


    return (
        <div className="main-item-content all-users-section">
            {isLoading && <CircleAnimation />}
            {isError && <Error text={"Error locating the users. Check your internet connection and try again"} />}
            {isSuccess && (
                <>
                    <h2>All Users:</h2>
                    <div className="user-list">
                        {users?.ids.map(id => <User key={id} userId={id} />)}
                    </div>
                </>
            )}
        </div>
    );
}