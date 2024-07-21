import Card from '../UI/card/Card'
import { NavLink } from 'react-router-dom'
import MainBtn from '../UI/buttons/MainBtn'
import bgBrain from '../../../public/big-brain.png'
export default function HomePageContent() {
  return (
    <Card bgColor='transparent'>
        <main className="main-content-container">
          <h1>MovieBrain</h1>
          <h2>The smartest way to search</h2>
          <h2>Create lists, leave reviews and check out what other people are watching</h2>
          <NavLink to="/search">
            <MainBtn>
              Search Movies
            </MainBtn>
          </NavLink>
          <img className='background-img' src={bgBrain} alt="background-brain" />
        </main>
      </Card>
  )
}
