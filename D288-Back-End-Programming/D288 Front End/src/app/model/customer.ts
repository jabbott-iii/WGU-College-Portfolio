export class Customer {

  constructor(
    public id: number,
    public address: string,
    public postal_code: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public division_id: number,
    public _links?: {
      self?: {
        href : string
      },
      customer?: {
        href : string
      },
      division?: {
        href : string
      },
      carts?: {
        href : string
      }
    }
  ) {
  }
}
