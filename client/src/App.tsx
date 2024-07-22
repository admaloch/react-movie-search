import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './components/MainPage'
import HomePageContent from './components/HomePage/HomePageContent'
import Register from './components/credentials/Register'
import Login from './components/credentials/Login'
import HomeLayout from './components/HomePage/HomeLayout'



function App() {


    return (
        <Routes>
            <Route path='/' element={<HomeLayout />} >
                <Route index element={<HomePageContent />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
            </Route>
            <Route path='/search' element={<MainPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes >
    )
}

export default App
