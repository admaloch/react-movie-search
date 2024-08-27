interface Ratings {
    "Source": string;
    "Value": string;
}

export interface OmdbItem {
    "Title": string;
    "Year": string;
    "Rated": string;
    "Released": string;
    "Runtime": string;
    "Genre": string;
    "Director": string;
    "Writer": string;
    "Actors": string;
    "Plot": string;
    "Language": string;
    "Country": string;
    "Poster": string;
    "Ratings": Ratings[];
    "imdbID": string;
    "Type": string;
    "Response": string;
}

export const defaultOmdbItem: OmdbItem = {
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Poster: '',
    Ratings: [],
    imdbID: '',
    Type: '',
    Response: '',
};
