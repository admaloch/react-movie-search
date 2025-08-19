import "./UserProfile.css";
import LikedMovieItem from "./LikedMovieItem";
import { Link } from "react-router-dom";
import { LikedUserMovies } from "../../../models/UserItemProps";
import MovieItemModal from "../../movie-api/ItemModal/MovieItemModal";
import { useState, useEffect, useRef } from "react";
import { useSearchType } from "../../../hooks/useSearchType";

interface LikedMovieItemsProps {
  likedMovies: LikedUserMovies[];
  isWatched: string;
}

export default function LikedMovieItems({
  likedMovies,
  isWatched,
}: LikedMovieItemsProps): React.JSX.Element | null {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImdbId, setCurrentImdbId] = useState("");
  const [visibleMovies, setVisibleMovies] = useState(new Set<number>());
  const movieRefs = useRef<HTMLDivElement[]>([]);
  const { currType } = useSearchType();
  const mainTypeFilter = currType.type;

  const closeModal = () => {
    setCurrentImdbId("");
    setIsModalOpen(false);
  };

  const filteredMovies = likedMovies.filter((movie) => {
    const itemTypeFilter = movie.type;
    return !(
      (movie.hasWatched && isWatched === "notWatched") ||
      (!movie.hasWatched && isWatched === "watched") ||
      (mainTypeFilter === "Movie" && itemTypeFilter !== "movie") ||
      (mainTypeFilter === "TV" && itemTypeFilter !== "series")
    );
  });

  const reversedMovies = filteredMovies.slice().reverse();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleMovies((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    movieRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, [reversedMovies]);

  return reversedMovies.length ? (
    <section className="movie-items-container">
      {reversedMovies.map((movie, index) => (
        <div
          key={movie.imdbId}
          data-index={index}
          ref={(el) => (movieRefs.current[index] = el!)}
          className={`movie-item-container ${
            visibleMovies.has(index) ? "visible" : "hidden"
          }`}
        >
          {visibleMovies.has(index) && (
            <LikedMovieItem
              imdbId={movie.imdbId}
              setIsModalOpen={setIsModalOpen}
              setCurrentImdbId={setCurrentImdbId}
            />
          )}
        </div>
      ))}

      {isModalOpen && (
        <MovieItemModal
          imdbId={currentImdbId}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </section>
  ) : (
    <div className="movie-items-container">
      <div className="no-movies-container">
        <h3>
          No results found. Try filtering other options,{" "}
          <Link to="/search">searching</Link> around, or check out what{" "}
          <Link to="/profiles">other users</Link> are watching.
        </h3>
      </div>
    </div>
  );
}
