import BGSection from '../UI/BGSection/BGSection'
import HomePageContent from './HomePageContent'
import HomePageNav from './HomePageNav'
import './Homepage.css'

export default function HomePage() {


  return (
    <BGSection bgClass="theatre-bg4">
      <HomePageNav/>
      <HomePageContent />
    </BGSection>
  )
}
