export class Cart {
  constructor(
    public orderTrackingNumber : string,
    public package_price : number,
    public party_size : number,
    public status : string,
    public _links : {
        self : {
          href : string
        },
        cart : {
          href : string
        },
        cartItems : {
          href : string
        },
        customer? : {
          href : string
        },
    },
    public create_date? : number,
    public last_update? : number,
  ) {
  }
}
