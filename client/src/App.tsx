import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import MainPage from './components/MainPage'



function App() {


    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<MainPage />} />
            <Route path='*' element={<Navigate to='/' />} />  
        </Routes >
    )
}

export default App
