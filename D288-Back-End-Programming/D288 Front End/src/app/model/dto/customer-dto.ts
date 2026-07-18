
/**
 * Customer Dto
 * Data Transfer Object for customer
 * used for rest api message sent to back end
 *
 *
 */
export class CustomerDto {

  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private address: string,
    private postal_code: string,
    private phone: string
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

  // set first name
  public setFirstName(nameIn: string) {
    this.firstName = nameIn;
  }

  // get first name
  public getFirstName() {
    return this.firstName;
  }

  // set last name
  public setLastName(nameIn: string) {
    this.lastName = nameIn;
  }

  // get last name
  public getLastName() {
    return this.lastName;
  }

  // set address
  public setAddress(addressIn: string) {
    this.address = addressIn;
  }

  // get address
  public getAddress() {
    return this.address;
  }

  // set postal code
  public setPostalCode(postalIn: string) {
    this.postal_code = postalIn;
  }

  // get postal code
  public getPostalCode() {
    return this.postal_code;
  }

  // set phone
  public setPhone(phoneIn: string) {
    this.phone = phoneIn;
  }

  // get phone
  public getPhone() {
    return this.phone;
  }


}
