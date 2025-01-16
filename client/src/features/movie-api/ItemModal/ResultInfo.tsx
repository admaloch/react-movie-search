import React from "react";
import ShowMovieReviews from "../../reviews/ShowMovieReviews";
import { OmdbItem } from "../../../models/ItemApiProps";

interface ResultInfoProps {
  item: OmdbItem;
  year: number;
}

export default function ResultInfo({
  item,
  year,
}: ResultInfoProps): React.JSX.Element {
  return (
    <>
      {item.Title !== "N/A" && <h3>{item.Title}</h3>}
      <section className="result-info">
        <ul>
          {item.Runtime !== "N/A" && (
            <li>
              {" "}
              <span>Runtime:</span> {item.Runtime}{" "}
            </li>
          )}
          {item.Rated !== "N/A" && (
            <li>
              {" "}
              <span>Rated:</span> {item.Rated}{" "}
            </li>
          )}
          {item.Released !== "N/A" && (
            <li>
              {" "}
              <span>Released:</span> {year}
            </li>
          )}
        </ul>
        {item.Genre !== "N/A" && (
          <p>
            <span>Genre:</span> {item.Genre}
          </p>
        )}
        {item.Director !== "N/A" && (
          <p>
            <span>Director:</span> {item.Director}
          </p>
        )}
        {item.Actors !== "N/A" && (
          <p>
            <span>Actors: </span>
            {item.Actors}
          </p>
        )}
        {item.Plot !== "N/A" && (
          <p>
            <span>Plot: </span>
            {item.Plot}
          </p>
        )}
        {item.Language !== "N/A" && (
          <p>
            <span>Language:</span> {item.Language}
          </p>
        )}
        <aside>
          <h4>Reviews:</h4>
          <ShowMovieReviews imdbId={item.imdbID} />
        </aside>
      </section>
    </>
  );
}
