import Card from "../UI/card/Card";
import { NavLink } from "react-router-dom";
import MainBtn from "../UI/buttons/MainBtn";
import useAuth from "../../hooks/useAuth";

export default function HomePageContent() {
  const { isLoggedIn } = useAuth();

  let button;

  if (isLoggedIn) {
    button = (
      <NavLink to="/search">
        <MainBtn>Search Movies</MainBtn>
      </NavLink>
    );
  } else {
    button = (
      <NavLink to="/login">
        <MainBtn>Login</MainBtn>
      </NavLink>
    );
  }

  return (
    <Card bgColor="transparent">
      <h1>MovieBrain</h1>
      <h2>
        Create lists, leave reviews and check out what other people are
        watching!
      </h2>
      {button}
    </Card>
  );
}
