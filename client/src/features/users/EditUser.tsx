import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById, useGetUserByIdQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation'
import useAuth from '../../hooks/useAuth'
import { containerClasses } from '@mui/material'
import Error from '../../components/UI/errors/Error'

const EditUser = () => {
    const { id } = useAuth()

    if (!id) return null


    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    if (isLoading) content = <CircleAnimation />
    if (isError) content = <Error text={"Couldn't find user information"} />
    else {
        content =
            <main className='user-profile-container'>
                <EditUserForm user={user} />
            </main>
    }


    return content
}
export default EditUser