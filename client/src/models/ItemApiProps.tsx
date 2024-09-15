import { RTKQueryInterface } from "./RTKQueryProps";

interface Ratings {
    Source: string;
    Value: string;
}

export interface SmallOmdbItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface OmdbItem extends SmallOmdbItem {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Ratings: Ratings[];
    Response: string;
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

export interface OmdbItemInterface {
    item: OmdbItem | null;
  }
//for rtk query 
  export interface OmdbItemWithRTK extends RTKQueryInterface, OmdbItemInterface {}
