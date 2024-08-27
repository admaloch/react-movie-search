import { store } from '../../app/store'
import useAuth from '../../hooks/useAuth';
import { reviewsApiSlice } from '../reviews/reviewsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    const { isLoggedIn } = useAuth()

    useEffect(() => {
        if (isLoggedIn) {
            // Only initiate requests if the user is authenticated
            const reviews = store.dispatch(reviewsApiSlice.endpoints.getReviews.initiate())
            const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

            return () => {
                reviews.unsubscribe()
                users.unsubscribe()
            }
        }
    }, [isLoggedIn])

    return <Outlet />
}
export default Prefetch
