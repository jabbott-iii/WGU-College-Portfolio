
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from 'src/app/model/customer';
import { CustomerApiResponse } from 'src/app/model/customer-api-response';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  customerUrl = 'http://localhost:8080/api/customers'

  customers: Customer[] = [];

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCustomers().subscribe(customers => this.customers = customers);
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges()
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<CustomerApiResponse>(this.customerUrl)
        .pipe(
          map(response => response._embedded.customers)
        )
  }

}
