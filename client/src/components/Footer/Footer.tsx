import { Link, Outlet } from "react-router-dom";
import "./Footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer(): JSX.Element {
  return (
    <>
      <Outlet />
      <footer className="footer">
        <p>Developed by Davis Maloch</p>
        <a target="_blank" href="https://github.com/admaloch">
          <GitHubIcon sx={{ marginRight: 0.5 }} />
          Github
        </a>
        <p>
          <Link to="/credits">Credits</Link> {/* Add router link to /credits */}
        </p>
      </footer>
    </>
  );
}
