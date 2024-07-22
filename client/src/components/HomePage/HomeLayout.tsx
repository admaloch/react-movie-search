import BGSection from '../UI/BGSection/BGSection'
import HomePageNav from '../HomePage/HomePageNav'
import './HomeLayout.css'
import { Outlet } from 'react-router-dom'

import bgBrain from '../../../public/big-brain.png'
import HomePageNavAlt from './HomePageNav'

export default function HomeLayout() {
  return (
    <BGSection bgClass="theatre-bg4">
      <HomePageNavAlt />
      <main className='main-content-container'>
        <Outlet />
        <img className='background-img' src={bgBrain} alt="background-brain" />
      </main>
    </BGSection>
  )
}
