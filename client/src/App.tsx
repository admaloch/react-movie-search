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
import { TypeProvider } from './store/searchTypeContext/TypeContext'
import { APIProvider } from './store/APIContext/APIContext'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
import { ToastContainer } from 'react-toastify'
import PersistLogin from './features/auth/PersistLogin'

function App() {


    return (
        <TypeProvider>
            <APIProvider>
                <Routes>
                    <Route path='/' element={<MainNavBar />} >
                        <Route path='/' element={<HomeLayout />} >
                            <Route index element={<HomePageContent />} />

                            <Route path="users">
                                <Route path=":id" element={<EditUser />} />
                                <Route path="register" element={<Register />} />
                            </Route>
                            <Route path='login' element={<Login />} />

                        </Route>

                        <Route path='/' element={<Footer />} >
                            <Route path='/search' element={<MainPage />} />
                            <Route element={<PersistLogin />}>
                                <Route element={<Prefetch />}>
                                    <Route path='/myprofile' element={<UserProfile />} />
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
        </TypeProvider>
    )
}

export default App
