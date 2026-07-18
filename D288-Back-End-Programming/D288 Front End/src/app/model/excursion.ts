export class Excursion {
  constructor(
    public excursion_title: string,
    public excursion_price: number,
    public image_URL: string,
    public create_date: Date,
    public last_update: Date,
    public _links: {
      self: {
        href: string
      }
    },
    public id: number
  ) {
  }
}
