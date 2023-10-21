
export default function ResultInfo({ item, year }) {
  return (
    <div className="result-info">
      {item.Title && <h3 >{item.Title}</h3>}
      <ul >
        {item.Runtime && <li> <span>Runtime:</span> {item.Runtime} </li>}
        {item.Rated && <li> <span>Rated:</span> {item.Rated} </li>}
        {item.Released && <li> <span>Released:</span> {year}</li>}
      </ul>
      {item.Genre && <p><span>Genre:</span> {item.Genre}</p>}
      {item.Director && <p><span>Director:</span> {item.Director}</p>}
      {item.Actors && <p><span>Actors: </span>{item.Actors}</p>}
      {item.Plot && <p className="plot"><span>Plot:</span>{item.Plot}</p>}
      {item.Language && <p><span>Language:</span> {item.Language}</p>}
    </div>
  )
}
