interface IsWatchedBtnsProps {
  isWatched: string;
  setIsWatched: (isWatched: string) => void;
}

export default function IsWatchedBtns({
  isWatched,
  setIsWatched,
}: IsWatchedBtnsProps) {
  const btnHandler = (value: string) => {
    setIsWatched(value);
  };

  return (
    <div id="result-type-container">
      <button
        className={`result-btn watched-btn ${
          isWatched === "watched" ? "active-btn" : ""
        }`}
        onClick={() => btnHandler("watched")}
      >
        Watched
      </button>
      <button
        className={`result-btn watched-btn ${
          isWatched === "notWatched" ? "active-btn" : ""
        }`}
        onClick={() => btnHandler("notWatched")}
      >
        Not watched
      </button>
      <button
        className={`result-btn watched-btn ${
          isWatched === "both" ? "active-btn" : ""
        }`}
        onClick={() => btnHandler("both")}
      >
        Both
      </button>
    </div>
  );
}
