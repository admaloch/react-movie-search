import { useEffect, useState } from "react";
import image_not_found from "../../assets/image_not_found.png";

interface PosterImageProps {
  poster: string;
  imdbId: string;
  height?: number | string;
  width?: number | string;
}

export default function PosterImage({ poster, imdbId, height, width }: PosterImageProps) {
  const [imgSrc, setImgSrc] = useState(
    poster !== "N/A" ? poster : image_not_found
  );

  useEffect(() => {
    setImgSrc(poster !== "N/A" ? poster : image_not_found);
  }, [poster]);

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
