import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Excursion} from 'src/app/model/excursion';

import {Cart} from 'src/app/model/cart';
import {CartApiResponse} from 'src/app/model/cart-api-response';

import {PurchaseDataService} from "../../services/purchase-data.service";
import {Vacation} from "../../model/vacation";

import {ExcursionDto} from "../../model/dto/excursion-dto";

@Component({
  selector: 'app-excursion-detail',
  templateUrl: './excursion-detail.component.html',
  styleUrls: ['./excursion-detail.component.css']
})
export class ExcursionDetailComponent implements OnInit {

  vacationUrl: string = 'http://localhost:8080/api/vacations';
  excursionsUrl = "http://localhost:8080/api/excursions/";
  cartItemsUrl: string = 'http://localhost:8080/api/cartItems';
  cartsUrl = "http://localhost:8080/api/carts";
  cartUrl: string = '';
  cartId: number = 0;

  excursion: Excursion = new Excursion("", 0, "", new Date(), new Date(), {self: {href: ""}}, 0);

  vacation: Vacation = new Vacation("",
    "",
    0,
    "",
    new Date(),
    new Date(),
    {self: {href: ""}},
    [],
    0);

  // capture values for vacation
  vacationId: number = 0;

  excursionId: number = 0;

  purchaseServiceDto: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private purchaseDataService: PurchaseDataService
  ) {
  }

  ngOnInit(): void {
    this.purchaseDataService.purchaseServiceData.subscribe((serviceData) => {
      // console.log('Excursion Detail Current Data Service:', serviceData);
      this.purchaseServiceDto = serviceData;
    })

    this.vacationId = +this.route.snapshot.paramMap.get('vacationId')!;
    this.excursionId = +this.route.snapshot.paramMap.get('excursionId')!;
    this.getExcursion(this.vacationId, this.excursionId).subscribe(excursion => this.excursion = excursion);

    this.getVacation(this.vacationId).subscribe(vacation => this.vacation = vacation);

  }

  getCarts(): Observable<Cart[]> {
    return this.http.get<CartApiResponse>(this.cartsUrl)
      .pipe(
        map(response => response._embedded.carts)
      );
  }

  getExcursion(vacationId: number, excursionId: number): Observable<Excursion> {
    return this.http.get<Excursion>(`${this.vacationUrl}/${vacationId}/excursions/${excursionId}`);
  }

  getVacation(vacationId: number): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.vacationUrl}/${vacationId}`);
  }

  addToCart(excursionId: number, vacationId: number) {
    // console.log("++++++++++++++++++++ ADD TO CART ++++++++++++++++++++")
    // add excursion to data service
    this.addExcursionToDataService();

    this.router.navigate(['/vacation', this.vacationId, 'excursions']);


  }

  addExcursionToDataService() {
    let newExcursion: ExcursionDto = new ExcursionDto(0, "", 0, "");
    newExcursion.setId(this.excursion.id);
    newExcursion.setExcursionTitle(this.excursion.excursion_title);
    newExcursion.setExcursionPrice(this.excursion.excursion_price);
    newExcursion.setImageUrl(this.excursion.image_URL);

    this.purchaseServiceDto.getCurrentCartItem().addExcursion(newExcursion);

  }
}
