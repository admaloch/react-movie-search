import { useRef } from "react";
import BioOverlayProps from "../../models/BioOverlayProps";
import { IoClose } from "react-icons/io5";

const BioOverlay = ({ plot, revealBio, closeBio }: BioOverlayProps): JSX.Element => {
  
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const mouseLeaveHandler = () => {
    if (scrollDivRef.current) {
      scrollToTop();
      closeBio();
    }
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
    ? { opacity: '1', height: '100%', zIndex: 50 }
    : { opacity: '0', height: '0', zIndex: 0 };

  return (
    <div
      ref={scrollDivRef}
      onMouseLeave={mouseLeaveHandler}
      style={styles}
      className='bio-overlay'>
      <h4>Overview</h4>
      <p>{plot}</p>
        <IoClose onClick={closeBio} className="icon-large close-bio-text"/>
    </div>
  );
};

export default BioOverlay;
