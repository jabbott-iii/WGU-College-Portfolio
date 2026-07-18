export class Country {

  constructor(
    public id: number,
    public country_name: string,
    public _links: {
      self: {
        href: string
      }
    }
  ) {
  }
}
