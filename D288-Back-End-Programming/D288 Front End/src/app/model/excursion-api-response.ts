import { Excursion } from './excursion';

export class ExcursionApiResponse {
  constructor(
    public _embedded: { excursions: Excursion[] }
  ) {
  }
}
