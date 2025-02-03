import { useState } from "react";
import "./Heart.css";

interface HeartProps {
  isLiked: boolean;
  style?: any;
}

export default function Heart({ isLiked, style }: HeartProps): JSX.Element {
  const [liked, setLiked] = useState(isLiked);

  const toggleDisplay = () => {
    if (!isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  return (
    <button onClick={toggleDisplay} aria-label={isLiked ? 'Unlike item' : 'Like item'}style={style} className="heart-bg">
      <div
        className={`heart-icon ${liked ? "liked" : ""}`}
        
      ></div>
    </button>
  );
}
