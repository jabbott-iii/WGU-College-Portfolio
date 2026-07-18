
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Vacation } from '../../model/vacation';
import {PurchaseDataService} from "../../services/purchase-data.service";
import {VacationDto} from "../../model/dto/vacation-dto";
import {CartItemDto} from "../../model/dto/cart-item-dto";
import {PurchaseDto} from "../../model/dto/purchase-dto";
import {CustomerDto} from "../../model/dto/customer-dto";
import {CartDto} from "../../model/dto/cart-dto.model";

@Component({
  selector: 'app-vacation-detail',
  templateUrl: './vacation-detail.component.html',
  styleUrls: ['./vacation-detail.component.css']
})
export class VacationDetailComponent implements OnInit {

  vacationUrl = 'http://localhost:8080/api/vacations';

  vacation: Vacation = new Vacation("", "", 0, "", new Date(), new Date(), { self: { href: "" }});
  vacationId: number = 0;

  purchaseServiceDto: any;

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private purchaseDataService: PurchaseDataService) { }

  ngOnInit(): void {

    // get data service
    this.purchaseDataService.purchaseServiceData.subscribe((serviceData) =>{
      this.purchaseServiceDto = serviceData;
    })

    this.vacationId = +this.route.snapshot.paramMap.get('vacationId')!;
    this.getVacation(this.vacationId).subscribe(vacation => this.vacation = vacation);

  }

  getVacation(vacationId: number): Observable<Vacation> {
    return this.http.get<Vacation>(`${this.vacationUrl}/${vacationId}`)
        .pipe(
          map(vacation => {
            let parsedId = vacation._links.self.href.split("/")[5];
            vacation.id = parseInt(parsedId);

            return vacation;
          })
        )
  }

  ngOnDestroy(){

      this.purchaseServiceDto.getCurrentCartItem().getVacation().setId(this.vacation.id);
      this.purchaseServiceDto.getCurrentCartItem().getVacation().setVacationTitle(this.vacation.vacation_title);
      this.purchaseServiceDto.getCurrentCartItem().getVacation().setDescription(this.vacation.description);
      this.purchaseServiceDto.getCurrentCartItem().getVacation().setTravelPrice(this.vacation.travel_price);
      this.purchaseServiceDto.getCurrentCartItem().getVacation().setImageUrl(this.vacation.image_URL);
  }

  ngAfterViewInit(){

      // create and set vacation id for later use
      let tempVacationDto = new VacationDto(0, "", "", 0, "");
      tempVacationDto.setId(this.vacationId);
      tempVacationDto.setVacationTitle(this.vacation.vacation_title);
      tempVacationDto.setTravelPrice(this.vacation.travel_price);

      // new cart item
      let tempCartItemDto = new CartItemDto(tempVacationDto, []);
      // set the vacation in the cart item
      tempCartItemDto.setVacation(tempVacationDto);

      this.purchaseServiceDto.addCartItem(tempCartItemDto);

    }

}
