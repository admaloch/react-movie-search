import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById, useGetUserByIdQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import LoadAnimation from '../../components/UI/LoadAnimation/LoadAnimation'
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation'
import useAuth from '../../hooks/useAuth'
import { containerClasses } from '@mui/material'
import Error from '../../components/UI/errors/Error'
import EditPasswordForm from './EditPasswordForm'

const EditPassword = () => {
    const { id } = useAuth()

    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    if (isLoading) content = <CircleAnimation />
    if (isError) content = <Error text={"Couldn't find user information"} />
    else {
        content =
            <main className='user-profile-container'>
                <EditPasswordForm user={user} />
            </main>
    }


    return content
}
export default EditPassword