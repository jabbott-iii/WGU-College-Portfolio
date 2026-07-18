export class CartItem {

  constructor(
    public _links: {
      self: {
        href: string
      },
      vacation: {
        href: string
      },
      cart: {
        href: string
      },
      excursions: {
        href: string
      }
    }
  ) {
  }
}
