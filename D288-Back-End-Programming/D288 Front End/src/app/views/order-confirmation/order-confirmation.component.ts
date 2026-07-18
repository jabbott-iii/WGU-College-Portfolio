import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from 'src/app/model/cart-item';
import {Customer} from 'src/app/model/customer';
import {PurchaseApiResponse} from 'src/app/model/purchase-api-response';
import {Vacation} from 'src/app/model/vacation';
import {PurchaseDataService} from "../../services/purchase-data.service";
import {CustomerDto} from "../../model/dto/customer-dto";
import {CartDto} from "../../model/dto/cart-dto.model";
import {PurchaseDto} from "../../model/dto/purchase-dto";
import {StatusType} from "../../model/StatusType";
import {VacationDto} from "../../model/dto/vacation-dto";
import {ExcursionDto} from "../../model/dto/excursion-dto";
import {CartItemDto} from "../../model/dto/cart-item-dto";


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  cartItemsUrl = "";
  checkoutUrl = "http://localhost:8080/api/checkout/purchase";
  customerUrl = "http://localhost:8080/api/customers/1";
  cartsUrl = "http://localhost:8080/api/carts";
  cartId = 0;

  cartItems: CartItem[] = [];
  vacations: Set<Vacation> = new Set();
  customer: Customer = new Customer(0, "", "", "", "", "", 0)

  orderTrackingNumber: string = ""

  purchaseServiceDto: any;

  customerDto: CustomerDto = new CustomerDto(0, "", "", "", "", "");

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private purchaseDataService: PurchaseDataService
  ) {
  }

  ngOnInit(): void {
    // new purchase data service dto
    this.purchaseDataService.purchaseServiceData.subscribe((serviceData) => {
      // console.log('Excursion Detail Current Data Service:', serviceData);
      this.purchaseServiceDto = serviceData;
    })

    // get customer dto from data service
    this.customerDto = this.purchaseServiceDto.getCustomer();

    this.checkout();

  }

  ngOnDestroy() {
    // reset the data service
    let status: StatusType = StatusType.pending;
    let tempCustomer: CustomerDto = new CustomerDto(0, "", "", "", "", "");
    let tempVacation: VacationDto = new VacationDto(0, "", "", 0, "");
    let tempCart: CartDto = new CartDto(0, 0, 1, status, tempCustomer);
    let tempExcursionList: ExcursionDto[] = [];
    let tempCartItem: CartItemDto = new CartItemDto(tempVacation, tempExcursionList);
    let tempCartItemList: CartItemDto[] = [];
    let purchaseDataDto: PurchaseDto = new PurchaseDto(tempCustomer, tempCart, tempCartItemList);

    this.purchaseDataService.setData(purchaseDataDto);
  }

  checkout() {

    // convert data service object to plain old object for api call
    let purchasePlain = Object.assign({}, this.purchaseServiceDto);

    // send request to back end
    this.http.post<PurchaseApiResponse>(this.checkoutUrl, purchasePlain).subscribe(response => {
      this.orderTrackingNumber = response.orderTrackingNumber;
    });

  }
}
