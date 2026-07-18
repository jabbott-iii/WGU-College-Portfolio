import { Country } from "./country";

export class CountryApiResponse {

  constructor(
    public _embedded: {
      countries: Country[]
    }
  ) {
  }
}
