import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById, useGetUserByIdQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import CircleAnimation from '../../components/UI/LoadAnimation/CircleAnimation'
import useAuth from '../../hooks/useAuth'
import { containerClasses } from '@mui/material'
import Error from '../../components/UI/errors/Error'

const EditUser = () => {
    const { id } = useAuth()
    const navigate = useNavigate()

    if (!id) {
        navigate(`/profiles/${id}`); // Adjust the path as needed
        return null; // Optionally return null to prevent further rendering
    }


    const { data: user, isLoading, isError, error, isSuccess } = useGetUserByIdQuery(id);

    let content

    console.log(user)

    if (isLoading) content = <CircleAnimation />
    else if (isError) content = <Error text={"Couldn't find user information"} />
    else {
        content =
            <main className='user-profile-container'>
                <EditUserForm user={user} />
            </main>
    }


    return content
}
export default EditUser