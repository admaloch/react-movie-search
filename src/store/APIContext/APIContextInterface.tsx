
export interface APIResults {
    "Title": string;
    "Year": string;
    "imdbID": string;
    "Type": string;
    "Poster": string;
}

export interface APIContextTheme {
    searchTerm: string;
    updateSearchState: (input: string) => void;
    submittedSearch: string;
    updateSubmittedSearch: (e: React.FormEvent) => void,
    apiResults: APIResults[],
    updateApiState: (results: APIResults[]) => void,
}