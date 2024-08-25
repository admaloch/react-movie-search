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

function App() {
    // const state = useSelector((state: RootState) => state);

    // console.log(state)
    // const state = useSearchType()
    //     console.log(state)

    return (

        <APIProvider>
            <Routes>
                <Route path='/' element={<MainNavBar />} >
                    <Route path='/' element={<HomeLayout />} >
                        <Route index element={<HomePageContent />} />

                        <Route path="users">
                            {/* <Route path=":id" element={<EditUser />} /> */}
                            <Route path="register" element={<Register />} />
                        </Route>
                        <Route path='login' element={<Login />} />

                    </Route>

                    <Route path='/' element={<Footer />} >
                        <Route element={<PersistLogin />}>
                            <Route path='/search' element={<MainPage />} />

                            <Route path="profiles">
                                <Route index element={<ListAllUsers />} />
                                <Route path=":id" element={<UserProfile />} />
                                <Route path=":id/edit" element={<EditUser />} />
                                <Route path=":id/password" element={<EditPassword />} />
                            </Route>



                        </Route>
                        <Route path='*' element={<Navigate to='/' />} />
                    </Route>

                </Route>
            </Routes >
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
