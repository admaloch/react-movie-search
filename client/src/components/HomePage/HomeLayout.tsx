import BGSection from '../UI/BGSection/BGSection'
import './HomeLayout.css'
import { Outlet } from 'react-router-dom'

import bgBrain from '../../../public/big-brain.png'
import MainNavBar from '../MainNav/MainNavBar'

export default function HomeLayout() {
  return (
    <BGSection bgClass="theatre-bg4">
      <MainNavBar />
      <main className='main-content-container'>
        <Outlet />
        <img className='background-img' src={bgBrain} alt="background-brain" />
      </main>
    </BGSection>
  )
}
