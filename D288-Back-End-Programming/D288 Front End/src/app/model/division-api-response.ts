import { Division } from "./division";

export class DivisionApiResponse {

  constructor(
    public _embedded: {
      divisions: Division[]
    }
  ) {
  }
}
