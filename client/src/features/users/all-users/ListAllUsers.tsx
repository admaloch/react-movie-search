import { useGetUsersQuery } from '../usersApiSlice'
import Error from '../../../components/UI/errors/Error'
import './User.css'
import User from './User'
import CircleAnimation from '../../../components/UI/LoadAnimation/CircleAnimation';

export default function ListAllUsers() {
    const {
        data: users,
        isLoading,
        isError,
    } = useGetUsersQuery('usersList', {
        refetchOnFocus: true, // or set to false if you don't need it
        refetchOnMountOrArgChange: false, // avoid refetching on every mount
    });

    let content = null

    if(isLoading) content = <CircleAnimation/>

    //@ts-ignore
    else if (isError || !users) content = <Error text={'We were unable to connect. Check your internet connection and try again.'} />


    else {
        const usersIds = users.ids as string[]
        content = (
            <>
                <h1>All Users:</h1>
                <div className="user-list">
                    {usersIds.map(id => <User key={id} userId={id} isLoading={isLoading} />)}
                </div>
            </>
        )
    }
    



    return (
        <main className="main-item-content all-users-section">
           {content}
        </main>
    );
}
