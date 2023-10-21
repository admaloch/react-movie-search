// const searchArr = [
//     {
//         "Title": "Dog Day Afternoon",
//         "Year": "1975",
//         "imdbID": "tt0072890",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BODExZmE2ZWItYTIzOC00MzI1LTgyNTktMDBhNmFhY2Y4OTQ3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
//     },
//     {
//         "Title": "The Power of the Dog",
//         "Year": "2021",
//         "imdbID": "tt10293406",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BZGRhYjE2NWUtN2FkNy00NGI3LTkxYWMtMDk4Yjg5ZjI3MWI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
//     },
//     {
//         "Title": "Alpha Dog",
//         "Year": "2006",
//         "imdbID": "tt0426883",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMjExODMyNzQzMl5BMl5BanBnXkFtZTYwNzMwNTg3._V1_SX300.jpg"
//     },
//     {
//         "Title": "Ghost Dog: The Way of the Samurai",
//         "Year": "1999",
//         "imdbID": "tt0165798",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ5ZTc1NjAtMGNjNi00ZDY1LWIyM2EtZmM1NTcwMjkzNmMyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"
//     },
//     {
//         "Title": "Wag the Dog",
//         "Year": "1997",
//         "imdbID": "tt0120885",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMzRkZDVkMDItYjk3Mi00NDkyLThmODUtYzhkN2EwZmE2ZTljXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
//     },
//     {
//         "Title": "Dog Soldiers",
//         "Year": "2002",
//         "imdbID": "tt0280609",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BYzUyZjE4OGEtZjAwYi00Y2Q2LWI2M2MtYWY3YWM5YmQzNTcwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"
//     },
//     {
//         "Title": "An Andalusian Dog",
//         "Year": "1929",
//         "imdbID": "tt0020530",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMjZlY2RjM2ItZGEwOC00ODQwLWFhZDYtMjE3ODMyYWNiOWNlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//     },
//     {
//         "Title": "Man Bites Dog",
//         "Year": "1992",
//         "imdbID": "tt0103905",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BZDM3N2Q5MDktNTIyYi00ZTYxLWE4NWQtYjAyYzYxYmNlZTFmXkEyXkFqcGdeQXVyMTEyODk3NTgz._V1_SX300.jpg"
//     },
//     {
//         "Title": "Dog",
//         "Year": "2022",
//         "imdbID": "tt11252248",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BYjA2MDM2YjctYzNhNC00NGEzLWFmYWEtODExODFkNmUyOGE2XkEyXkFqcGdeQXVyODk2NDQ3MTA@._V1_SX300.jpg"
//     },
//     {
//         "Title": "Diary of a Wimpy Kid: Dog Days",
//         "Year": "2012",
//         "imdbID": "tt2023453",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BMTc2MTk4MTk4Nl5BMl5BanBnXkFtZTcwMzgzOTY2Nw@@._V1_SX300.jpg"
//     }
// ]


const exampleRequest = {
    "Title": "Dog Day Afternoon",
    "Year": "1975",
    "Rated": "R",
    "Released": "25 Dec 1975",
    "Runtime": "125 min",
    "Genre": "Biography, Crime, Drama",
    "Director": "Sidney Lumet",
    "Writer": "Frank Pierson, P.F. Kluge, Thomas Moore",
    "Actors": "Al Pacino, John Cazale, Penelope Allen",
    "Plot": "Three amateur bank robbers plan to hold up a bank. A nice simple robbery: Walk in, take the money, and run. Unfortunately, the supposedly uncomplicated heist suddenly becomes a bizarre nightmare as everything that could go wrong d...",
    "Language": "English",
    "Country": "United States",
    "Awards": "Won 1 Oscar. 14 wins & 20 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODExZmE2ZWItYTIzOC00MzI1LTgyNTktMDBhNmFhY2Y4OTQ3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    "Ratings": [{
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
    }, {
        "Source": "Rotten Tomatoes",
        "Value": "96%"
    }, {
        "Source": "Metacritic",
        "Value": "86/100"
    }],
    "Metascore": "86",
    "imdbRating": "8.0",
    "imdbVotes": "267,511",
    "imdbID": "tt0072890",
    "Type": "movie",
    "DVD": "15 Aug 2008",
    "BoxOffice": "$50,000,000",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}