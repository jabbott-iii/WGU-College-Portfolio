export class VacationDto {

  /**
   * Vacation Dto
   * Data Transfer Object for vacation
   * used for rest api message sent to back end
   *
   *
   */
  constructor(
    private id: number,
    private vacation_title: string,
    private description: string,
    private travel_price: number,
    private image_URL: string,
  ) {
  }

  // set id
  public setId(idIn: number) {
    this.id = idIn;
  }

  // get id
  public getId() {
    return this.id;
  }

  // set vacation title
  public setVacationTitle(titleIn: string) {
    this.vacation_title = titleIn;
  }

  // get vacation title
  public getVacationTitle() {
    return this.vacation_title;
  }

  // set  description
  public setDescription(descriptionIn: string) {
    this.description = descriptionIn;
  }

  // get vacation title
  public getDescription() {
    return this.description;
  }

  // set travel price
  public setTravelPrice(priceIn: number) {
    this.travel_price = priceIn;
  }

  // get travel price
  public getTravelPrice() {
    return this.travel_price;
  }

  // set url
  public setImageUrl(urlIn: string) {
    this.image_URL = urlIn;
  }

  // get url
  public getImageUrl() {
    return this.image_URL;
  }

}
