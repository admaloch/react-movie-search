import BGSection from "../UI/BGSection/BGSection";
import "./HomeLayout.css";
import { Outlet } from "react-router-dom";
import bgBrain from "../../assets/big-brain.png";
import { useEffect, useState } from "react";
import HomeSkeletonLoad from "../UI/LoadAnimation/skeleton-loaders/HomeSkeletonLoad";

export default function HomeLayout() {
  const [showLoadingSkeleton, setShowLoadingSkeleton] = useState(() => {
    return sessionStorage.getItem("loadSkeletonShown") !== "true";
  });

  useEffect(() => {
    if (showLoadingSkeleton) {
      // Set a timeout to hide the splash screen after 1 second
      const timer = setTimeout(() => {
        setShowLoadingSkeleton(false);
        sessionStorage.setItem("loadSkeletonShown", "true"); // Mark splash as shown
      }, 1200);

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [showLoadingSkeleton]);

  return (
    <>
      {showLoadingSkeleton && <HomeSkeletonLoad />}

      <BGSection bgClass="theatre-bg">
        <main id="main-content" className="main-content-container">
          <Outlet />
          <img
            className="background-img"
            src={bgBrain}
            alt="background-brain"
          />
        </main>
      </BGSection>
    </>
  );
}
