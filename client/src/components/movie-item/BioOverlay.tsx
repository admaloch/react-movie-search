import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface BioOverlayProps {
  plot: string;
  revealBio: Boolean;
  closeBio: () => void;
  title: string;
}

const BioOverlay = ({
  plot,
  revealBio,
  closeBio,
  title,
}: BioOverlayProps): JSX.Element => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const mouseLeaveHandler = () => {
    if (scrollDivRef.current) {
      closeBioOverlay();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeBioOverlay();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeBioOverlay = () => {
    scrollToTop();
    closeBio();
  };

  const scrollToTop = () => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  let styles = revealBio
    ? { opacity: "1", height: "100%", zIndex: 50 }
    : { opacity: "0", height: "0", zIndex: 0 };

  return (
    <div
    tabIndex={-1}
      ref={scrollDivRef}
      onMouseLeave={mouseLeaveHandler}
      style={styles}
      className="bio-overlay"
    >
      <h4>{title}</h4>
      <p>{plot}</p>
    </div>
  );
};

export default BioOverlay;
