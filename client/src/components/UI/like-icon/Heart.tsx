import { useState } from "react";
import './Heart.css';

interface HeartProps {
    isLiked: boolean;
}

export default function Heart({isLiked}: HeartProps): JSX.Element {

  const [liked, setLiked] = useState(isLiked);

  const toggleDisplay = () => {
    if (!isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  return (
    <div className="heart">
      <div className="heart-bg">
        <div
          className={`heart-icon ${liked ? "liked" : ""}`}
          onClick={toggleDisplay}
        ></div>
      </div>
    </div>
  );
}
