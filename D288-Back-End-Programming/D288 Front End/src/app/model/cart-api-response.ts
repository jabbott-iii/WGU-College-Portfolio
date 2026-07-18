import { Cart } from "./cart";

export class CartApiResponse {
  constructor(
    public _embedded : {
      carts : Cart[]
    },
    public _links : {
      self : {
        href : string
      },
      profile : {
        href : string
      }
    },
    public page : {
      size : number,
      totalElements : number,
      totalPages : number,
      number : number
    }
  ){}
}
