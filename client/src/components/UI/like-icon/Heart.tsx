import { useState } from "react";
import './Heart.css';

interface HeartProps {
    isLiked: boolean;
    style?: any;
}

export default function Heart({isLiked, style}: HeartProps): JSX.Element {

  const [liked, setLiked] = useState(isLiked);

  const toggleDisplay = () => {
    if (!isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  return (
      <div style={style} className="heart-bg">
        <div aria-label="like or unlike item"
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={toggleDisplay}
        ></div>
      </div>
  );
}
