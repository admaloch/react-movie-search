import BGSection from '../UI/BGSection/BGSection';
import './HomeLayout.css';
import { Outlet } from 'react-router-dom';
import bgBrain from '../../assets/big-brain.png';
import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';

export default function HomeLayout() {
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem('splashShown') !== 'true';
  });

  useEffect(() => {
    if (showSplash) {
      // Set a timeout to hide the splash screen after 1 second
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true'); // Mark splash as shown
      }, 800);

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [showSplash]);

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <BGSection bgClass="theatre-bg">
          <main className="main-content-container">
            <Outlet />
            <img className="background-img" src={bgBrain} alt="background-brain" />
          </main>
        </BGSection>
      )}
    </>
  );
}
