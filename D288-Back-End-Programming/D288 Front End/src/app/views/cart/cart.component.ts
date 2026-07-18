import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CartItem} from 'src/app/model/cart-item';
import {CartCartItemsApiResponse} from 'src/app/model/cart-cart-items-api-response';
import {Excursion} from 'src/app/model/excursion';
import {Vacation} from 'src/app/model/vacation';
import {Cart} from 'src/app/model/cart';
import {CartItemExcursionsApiResponse} from 'src/app/model/cart-item-excursions-api-response';
import {CartApiResponse} from 'src/app/model/cart-api-response';
import {Customer} from 'src/app/model/customer';
import {PurchaseDataService} from "../../services/purchase-data.service";
import {CartItemDto} from "../../model/dto/cart-item-dto";
import {ExcursionDto} from "../../model/dto/excursion-dto";

/**
 * Cart
 * Display cart on pages
 *
 *
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartsUrl = "http://localhost:8080/api/carts";
  cartItemsUrl = "";
  customerUrl = "http://localhost:8080/api/customers/1";

  cartId = 0;
  cartItems: CartItem[] = [];
  vacations: Set<Vacation> = new Set();
  package_price: number = 0;
  party_size: number = 1;
  cartItemsPrice: number = 0;
  purchaseServiceDto: any;

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private purchaseDataService: PurchaseDataService) {
  }


  ngOnInit(): void {

    // load data service
    this.purchaseDataService.purchaseServiceData.subscribe((serviceData) => {
      console.log('Excursion Detail Current Data Service:', serviceData);
      this.purchaseServiceDto = serviceData;
    })

    // get the current party size
    this.party_size = this.purchaseServiceDto.getCart().getPartySize();
    console.log("PARTY SIZE 1 " + this.party_size);
    // call sum with string
    this.sumCartItems(this.party_size.toString());

  }

  /**
   * process party size and price
   * call on init and when party size changes on page
   *
   * @param party_size
   */
  sumCartItems(party_size: string): void {

    this.party_size = parseInt(party_size)
    console.log("PARTY SIZE 2 " + this.party_size);
    this.purchaseServiceDto.getCart().setPartySize(this.party_size);
    // reset price for new calc
    this.cartItemsPrice = 0;

    let cartItemList: CartItemDto [] = this.purchaseServiceDto.getCartItems();
    cartItemList.forEach(currentCartItem => {
      // get vacation price
      let vacationPrice: number = currentCartItem.getVacation().getTravelPrice();
      // add vacation cost
      this.cartItemsPrice += vacationPrice;
      console.log(this.cartItemsPrice);
      // get excursion prices
      let excursionList: ExcursionDto [] = currentCartItem.getExcursions();
      // loop through excursion and add price
      excursionList.forEach(currentExcursion => {
        let excursionPrice = currentExcursion.getExcursionPrice();
        this.cartItemsPrice += excursionPrice;
        console.log("Prices when add Excursions " + this.cartItemsPrice);
      })

      // calculate total package price
      this.package_price = this.cartItemsPrice * this.party_size;
      console.log("PACKAGE PRICE IN SUM " + this.package_price);
    })

    // update the data service with new package price and party size
    this.purchaseServiceDto.getCart().setPackagePrice(this.package_price);
    this.purchaseServiceDto.getCart().setPartySize(this.party_size);

  }
}
