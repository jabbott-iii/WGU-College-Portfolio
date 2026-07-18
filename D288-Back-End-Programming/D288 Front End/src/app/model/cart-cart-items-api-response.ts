import { CartItem } from "src/app/model/cart-item";

export class CartCartItemsApiResponse {

  constructor(
    public _embedded: {
      cartItems: CartItem[]
    }
  ) {
  }
}
