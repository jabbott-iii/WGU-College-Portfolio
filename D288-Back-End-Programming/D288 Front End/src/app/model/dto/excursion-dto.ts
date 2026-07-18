export class ExcursionDto {

  /**
   * Excursion Dto
   * Data Transfer Object for excursion
   * used for rest api message sent to back end
   *
   *
   */
  constructor(
    private id: number,
    private excursion_title: string,
    private excursion_price: number,
    private image_URL: string
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

  // set excursion title
  public setExcursionTitle(titleIn: string) {
    this.excursion_title = titleIn;
  }

  // get excursion title
  public getExcursionTitle() {
    return this.excursion_title;
  }

  // set excursion price
  public setExcursionPrice(priceIn: number) {
    this.excursion_price = priceIn;
  }

  // get excursion price
  public getExcursionPrice() {
    return this.excursion_price;
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
