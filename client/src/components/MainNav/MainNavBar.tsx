import './MainNavBar.css';
import MainNavLogo from "./MainNavLogo";
import MainNavContent from "./MainNavContent";


function MainNavBar() {
    return (
        <header>
            <MainNavLogo />
            <MainNavContent />
        </header>
    );
}

export default MainNavBar;
