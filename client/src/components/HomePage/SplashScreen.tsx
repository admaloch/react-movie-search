import './SplashScreen.css';
//@ts-ignore
import splashImg from '../../assets/vectorHomePage.svg';

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={splashImg} alt="Loading" className="splash-image" />
    </div>
  );
}
