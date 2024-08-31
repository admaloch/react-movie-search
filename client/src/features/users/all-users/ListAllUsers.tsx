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
        refetchOnFocus: true, // or set to false if you don't need it
        refetchOnMountOrArgChange: false, // avoid refetching on every mount
    });



    // console.log("Users data in ListAllUsers:", users); // Log users data
    if (isLoading) return <CircleAnimation />;
    if (isError) return <Error text={`Error: ${error.data.message}. Check your internet connection and try again.`} />


    return (
        <div className="main-item-content all-users-section">

            <h2>All Users:</h2>
            <div className="user-list">
                {users?.ids.map(id => <User key={id} userId={id} />)}
            </div>


        </div>
    );
}
