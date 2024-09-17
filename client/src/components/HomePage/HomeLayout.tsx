import BGSection from '../UI/BGSection/BGSection'
import './HomeLayout.css'
import { Outlet } from 'react-router-dom'
import bgBrain from '../../assets/big-brain.png'

export default function HomeLayout() {
  return (
    <BGSection bgClass="theatre-bg">
      <main className='main-content-container'>
        <Outlet />
        <img className='background-img' src={bgBrain} alt="background-brain" />
      </main>
    </BGSection>
  )
}