import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import HomePageContent from './components/HomePage/HomePageContent'
import Register from './features/users/Register'
import Login from './features/auth/Login'
import HomeLayout from './components/HomePage/HomeLayout'
import MainNavBar from './components/MainNav/MainNavBar'
import Footer from './components/Footer/Footer'
import UserProfile from './features/users/UserProfile/UserProfile'
import { APIProvider } from './store/APIContext/APIContext'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
import { ToastContainer } from 'react-toastify'
import PersistLogin from './features/auth/PersistLogin'
import ListAllUsers from './features/users/all-users/ListAllUsers'
import SettingsPage from './features/users/UserProfile/settings-page/SettingsPage'
import EditPassword from './features/users/EditPassword'
import Error from './components/UI/errors/Error'
import EditPasswordForm from './features/users/EditPasswordForm'
import EditUserForm from './features/users/EditUserForm'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle'

function App() {

    useTitle('Movie Brain')

    return (

        <APIProvider>
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
                                <Route path='*' element={<Error text="We couldn't find what you were looking for!" />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
            
            <ToastContainer
                position="top-center"
                autoClose={1700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </APIProvider>

    )
}

export default App
