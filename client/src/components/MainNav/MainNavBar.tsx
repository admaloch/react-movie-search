import './MainNavBar.css';
import MainNavLogo from "./MainNavLogo";
import MainNavContent from "./MainNavContent";
import { Outlet } from 'react-router-dom';


function MainNavBar() {
    return (
        <>
            <header>
                <div className="header-content">
                    <MainNavLogo />
                    <MainNavContent />
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default MainNavBar;
