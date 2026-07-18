import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {VacationApiResponse} from '../../model/vacation-api-reponse';
import {Vacation} from '../../model/vacation';
import {PurchaseDataService} from "../../services/purchase-data.service";
import {Customer} from "../../model/customer";
import {Cart} from "../../model/cart";
import {CartApiResponse} from "../../model/cart-api-response";
import {CartDto} from "../../model/dto/cart-dto.model";
import {StatusType} from "../../model/StatusType";
import {CustomerDto} from "../../model/dto/customer-dto";
import {CustomerApiResponse} from "../../model/customer-api-response";


/**
 *
 */
@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {

  // urls
  vacationUrl = 'http://localhost:8080/api/vacations';
  cartsUrl = 'http://localhost:8080/api/carts';
  customerUrl = "http://localhost:8080/api/customers";

  // vacations for the page
  vacations: Vacation[] = [];

  // data service payload
  purchaseServiceDto: any;

  // customer
  customer: Customer = new Customer(0, "", "", "", "", "", 0)

  status: StatusType = StatusType.pending;
  customerDto: CustomerDto = new CustomerDto(0, "", "", "", "", "");
  cartDto: CartDto = new CartDto(0,0, 0, this.status , this.customerDto);

  allCarts: Cart [] = [];
  newCartDto: CartDto = new CartDto(0,0, 0, this.status , this.customerDto);
  customers: Customer[] = [];
  newestCustomerInDB: number = 0;
  lastCartId: number = 0;

  constructor(private http: HttpClient,
              private purchaseDataService: PurchaseDataService) { }

  ngOnInit(): void {
    // purchase data service
    this.purchaseDataService.purchaseServiceData.subscribe((serviceData) => {
      // console.log('Excursion Detail Current Data Service:', serviceData);
      this.purchaseServiceDto = serviceData;
    })


    // get the ID of the newest customer in the database
    this.getCustomers().subscribe(customers =>
    {
      this.customers = customers
      console.log("CUSTOMER LENGTH " + this.customers.length);
      this.newestCustomerInDB = this.customers[customers.length-1].id;
      console.log("LAST CUSTOMER " + this.newestCustomerInDB.toString());

      this.getCustomer(this.newestCustomerInDB).subscribe(customer => {
        this.customer = customer
        console.log("LAST CUSTOMER IN DB " + this.customer);
      });

    });

    this.getVacations().subscribe(vacations => {
      vacations.forEach(vacation => {
        let parsedId = vacation._links.self.href.split("/")[5];
        vacation.id = parseInt(parsedId);
      });
      this.vacations = vacations;
    });

  }// end on init

  ngOnDestroy(){
    // set customer details
    this.purchaseServiceDto.getCustomer().setId(this.customer.id);
    this.purchaseServiceDto.getCustomer().setFirstName(this.customer.firstName);
    this.purchaseServiceDto.getCustomer().setLastName(this.customer.lastName);
    this.purchaseServiceDto.getCustomer().setAddress(this.customer.address);
    this.purchaseServiceDto.getCustomer().setPostalCode(this.customer.postal_code);
    this.purchaseServiceDto.getCustomer().setPhone(this.customer.phone);

    // set cart status
    this.purchaseServiceDto.getCart().setStatusType(StatusType.pending);

  }

  getCustomer(idIn: number): Observable<Customer> {
    console.log("CUSTOMER ID PASSED TO GET CUSTOMER " + idIn);
    return this.http.get<Customer>(this.customerUrl + "/" + idIn);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<CustomerApiResponse>(this.customerUrl)
      .pipe(
        map(response => response._embedded.customers)
      )
  }

  getAllCustomers(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(this.customerUrl);
  }

  getVacations(): Observable<Vacation[]> {
    return this.http.get<VacationApiResponse>(this.vacationUrl)
      .pipe(
        map(response => response._embedded.vacations)
      )
  }

}
