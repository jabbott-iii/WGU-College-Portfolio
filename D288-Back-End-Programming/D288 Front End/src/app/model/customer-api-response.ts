import { Customer } from 'src/app/model/customer';

export class CustomerApiResponse {

  constructor(
    public _embedded: { "customers": Customer[] },
  ) {
  }
}
