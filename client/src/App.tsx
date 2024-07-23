import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import HomePageContent from './components/HomePage/HomePageContent'
import Register from './components/credentials/Register'
import Login from './components/credentials/Login'
import HomeLayout from './components/HomePage/HomeLayout'
import LikedItems from './components/UserProfile/UserProfile'
import MainNavBar from './components/MainNav/MainNavBar'
import Footer from './components/Footer/Footer'
import UserProfile from './components/UserProfile/UserProfile'
import { TypeProvider } from './store/searchTypeContext/TypeContext'
import { APIProvider } from './store/APIContext/APIContext'



function App() {


    return (
        <TypeProvider>
            <APIProvider>
                <Routes>
                    <Route path='/' element={<MainNavBar />} >
                        <Route path='/' element={<HomeLayout />} >
                            <Route index element={<HomePageContent />} />
                            <Route path='register' element={<Register />} />
                            <Route path='login' element={<Login />} />
                        </Route>

                        <Route path='/' element={<Footer />} >
                            <Route path='/search' element={<MainPage />} />
                            <Route path='/myprofile' element={<UserProfile />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Route>

                    </Route>
                </Routes >
            </APIProvider>
        </TypeProvider>
    )
}

export default App
