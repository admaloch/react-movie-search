import Card from '../UI/card/Card'
import { NavLink } from 'react-router-dom'
import MainBtn from '../UI/buttons/MainBtn'

export default function HomePageContent() {
  return (
    <Card bgColor='transparent'>
        <h1>MovieBrain</h1>
        <h2>The smartest way to search</h2>
        <h2>Create lists, leave reviews and check out what other people are watching</h2>
        <NavLink to="/search">
          <MainBtn>
            Search Movies
          </MainBtn>
        </NavLink>
    </Card>
  )
}
