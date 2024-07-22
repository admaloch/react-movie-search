import './MainNavBar.css';
import MainNavLogo from "./MainNavLogo";
import MainNavContent from "./MainNavContent";
import { Outlet } from 'react-router-dom';


function MainNavBar() {
    return (
        <>
            <header>
                <MainNavLogo />
                <MainNavContent />
            </header>
            <Outlet />
        </>
    );
}

export default MainNavBar;
