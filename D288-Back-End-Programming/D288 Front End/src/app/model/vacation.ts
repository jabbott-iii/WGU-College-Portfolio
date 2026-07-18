import { Excursion } from "./excursion";

export class Vacation {

  constructor(
      public vacation_title: string,
      public description: string,
      public travel_price: number,
      public image_URL: string,
      public create_date: Date,
      public last_update: Date,
      public _links: {
        self: {
          href: string
        }
      },
      public excursions?: Excursion[],
      public id?: number
  ) {
  }

  public getTitle(){
    return this.vacation_title;
  }

}
