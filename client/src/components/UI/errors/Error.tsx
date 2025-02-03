import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import "./Error.css";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import useAuth from "../../../hooks/useAuth";
import InfoCard from "../card/InfoCard";

export default function Error({ text }: { text: string }): JSX.Element {
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main id="main-content" className="main-item-content">
      <InfoCard classes="item-error">
        <SentimentDissatisfiedIcon sx={{ fontSize: 100 }} />
        <h1>{text}</h1>
        {!isLoggedIn && (
          <>
            <div className="err-link">
              <ArrowCircleLeftIcon
                style={{
                  marginRight: "5px",
                }}
              />
              <NavLink className="navlink-style" to="/login">
                Login
              </NavLink>
            </div>
            <div className="err-link">
              <ArrowCircleLeftIcon
                style={{
                  marginRight: "5px",
                }}
              />
              <NavLink className="navlink-style" to="/users/register">
                Register a new account
              </NavLink>
            </div>
          </>
        )}
        <div className="err-link">
          <ArrowCircleLeftIcon
            style={{
              marginRight: "5px",
            }}
          />
          <a tabIndex={0} onClick={handleGoBack}>Return to previous page</a>
        </div>
        <div className="err-link">
          <ArrowCircleLeftIcon
            style={{
              marginRight: "5px",
            }}
          />
          <NavLink className="navlink-style" to="/">
            Return to homepage
          </NavLink>
        </div>
      </InfoCard>
    </main>
  );
}
