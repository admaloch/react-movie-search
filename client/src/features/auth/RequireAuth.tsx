import { useLocation, Navigate, Outlet, useParams } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import CircleAnimation from "../../components/UI/LoadAnimation/CircleAnimation"
import { toast } from "react-toastify"

const RequireAuth = () => {
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    const { id, isLoggedIn } = useAuth()
    const { id: paramId } = useParams()

    useEffect(() => {
        if (id) {
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    // console.log('userid:', id)
    // console.log('parami:', paramId)

    let content

    if (isLoading) content = <CircleAnimation />

    else if (!isLoading && id === paramId ) {
        content = <Outlet />
    }

    else {
        toast.dismiss();
        toast.error("Unfortunately, you don't have access to that");
        const navDestination = isLoggedIn ? `/profiles/${id}` : '/login'
        content = <Navigate to={navDestination} state={{ from: location }} replace />
    }


    return content
}
export default RequireAuth