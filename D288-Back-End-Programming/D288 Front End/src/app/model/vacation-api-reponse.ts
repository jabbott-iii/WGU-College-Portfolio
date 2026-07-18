import { Vacation } from './vacation';

export class VacationApiResponse {

  constructor(
      public _embedded: { vacations: Vacation[] },
      public _links: Object[],
      public page: Object
  ) {
  }
}
