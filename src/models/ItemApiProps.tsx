interface Ratings {
    "Source?": string;
    "Value?": string;
}

export default interface APIItem {
    "Title?": string;
    "Year?": string;
    "Rated?": string;
    "Released?": string;
    "Runtime?": string;
    "Genre?": string;
    "Director?": string;
    "Writer?": string;
    "Actors?": string;
    "Plot?": string;
    "Language?": string;
    "Country?": string;
    "Poster?": string;
    "Ratings?": Ratings[];
    "imdbID?": string;
    "Type?": string;
    "Response?": string;
}