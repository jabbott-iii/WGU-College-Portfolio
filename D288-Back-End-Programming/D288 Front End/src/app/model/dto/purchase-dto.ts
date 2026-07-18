import {CustomerDto} from "./customer-dto";
import {CartDto} from "./cart-dto.model";
import {CartItemDto} from "./cart-item-dto";

/**
 * Purchase Dto
 * Data Transfer Object for purchase message expected on back end
 * used for rest api message sent to back end
 *
 *
 */
export class PurchaseDto {

  constructor(
    private customer: CustomerDto,
    private cart: CartDto,
    private cartItems: CartItemDto []
  ) {

    this.nextIndex = 0;
  }

  private nextIndex: number;

  // set customer
  public setCustomer(customerIn: CustomerDto) {
    this.customer = customerIn;
  }

  // get customer
  public getCustomer() {
    return this.customer;
  }

  // set cart
  public setCart(cartIn: CartDto) {
    this.cart = cartIn;
  }

  // get cart
  public getCart() {
    return this.cart;
  }

  // set cart item in cart items
  public addCartItem(cartItemIn: CartItemDto) {
    this.cartItems.push(cartItemIn);
    this.nextIndex += 1;
  }

  // get cart items
  public getCartItems() {
    return this.cartItems;
  }

  // get most recent cart item index
  public getCurrentCartItem() {
    let currentIndex = this.nextIndex - 1;
    return this.cartItems[currentIndex];
  }

}
