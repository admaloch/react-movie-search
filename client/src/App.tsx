import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import HomePageContent from './components/HomePage/HomePageContent'
import Register from './features/users/Register'
import Login from './features/auth/Login'
import HomeLayout from './components/HomePage/HomeLayout'
import MainNavBar from './components/MainNav/MainNavBar'
import Footer from './components/Footer/Footer'
import UserProfile from './features/users/UserProfile/UserProfile'
import Prefetch from './features/auth/Prefetch'
import { ToastContainer } from 'react-toastify'
import PersistLogin from './features/auth/PersistLogin'
import ListAllUsers from './features/users/all-users/ListAllUsers'
import Error from './components/UI/errors/Error'
import EditPasswordForm from './features/users/EditPasswordForm'
import EditUserForm from './features/users/EditUserForm'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle'
import Credits from './components/credits/Credits'
function App() {

    useTitle('Movie Brain')

    return (

        <>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route element={<Prefetch />}>
                        <Route path='/' element={<MainNavBar />}>
                            <Route path='/' element={<HomeLayout />}>
                                <Route index element={<HomePageContent />} />
                                <Route path="users">
                                    <Route path="register" element={<Register />} />
                                </Route>
                                <Route path='login' element={<Login />} />
                            </Route>
                            <Route path='/' element={<Footer />}>
                                <Route path='/search' element={<MainPage />} />
                                <Route path="profiles">
                                    <Route index element={<ListAllUsers />} />
                                    <Route path=":id" element={<UserProfile />} />
                                    <Route element={<RequireAuth />}>
                                        <Route path=":id/edit" element={<EditUserForm />} />
                                        <Route path=":id/password" element={<EditPasswordForm />} />
                                    </Route>
                                </Route>
                                <Route path='/credits' element={<Credits />} />
                                <Route path='*' element={<Error text="We couldn't find what you were looking for!" />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </>

    )
}

export default App
