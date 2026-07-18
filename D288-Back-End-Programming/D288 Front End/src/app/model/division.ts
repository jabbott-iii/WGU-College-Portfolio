export class Division {

  constructor(
    public id: number,
    public division_name: string,
    public country_id: number,
    public _links: {
      country: {
        href: string
      },
      self: {
        href: string
      }
    }
  ) {
  }
}
