export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDbResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
