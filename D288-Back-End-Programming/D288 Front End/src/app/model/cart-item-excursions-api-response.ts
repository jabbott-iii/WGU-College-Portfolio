import { Excursion } from "./excursion";

export class CartItemExcursionsApiResponse {

  constructor(
    public _embedded: {
      excursions: Excursion[]
    }
  ) {
  }
}
