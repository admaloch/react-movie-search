import { useState } from "react";
import image_not_found from "../../assets/image_not_found.png";

interface PosterImageProps {
  poster: string;
  imdbId: string;
  height: number;
  width: number;
}

export default function PosterImage({ poster, imdbId, height, width }: PosterImageProps) {
  const [imgSrc, setImgSrc] = useState(
    poster !== "N/A" ? poster : image_not_found
  );

  const handleImgError = () => {
    setImgSrc(image_not_found);
  };

  return (
    <img
      src={imgSrc}
      onError={handleImgError}
      alt={imdbId}
      height={height}
      width={width}
    />
  );
}
