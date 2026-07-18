import {StatusType} from "../StatusType";
import {CustomerDto} from "./customer-dto";

/**
 * Cart Dto
 * Data Transfer Object for Cart
 * used for rest api message sent to back end
 *
 *
 */
export class CartDto {

  constructor(
    private id: number,
    private package_price: number,
    private party_size: number,
    private status: StatusType,
    private customer: CustomerDto
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

  // set package price
  public setPackagePrice(priceIn: number) {
    this.package_price = priceIn;
  }

  // get package price
  public getPackagePrice() {
    return this.package_price;
  }

  // set party size
  public setPartySize(sizeIn: number) {
    this.party_size = sizeIn;
  }

  // get party size
  public getPartySize() {
    return this.party_size;
  }

  // set status
  public setStatusType(statusIn: StatusType) {
    this.status = statusIn;
  }

  // get status
  public getStatus() {
    return this.status;
  }

  // set customer
  public setCustomer(customerIn: CustomerDto) {
    this.customer = customerIn;
  }

  // get customer
  public getCustomer() {
    return this.customer;
  }

}
