import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';

import { Country } from 'src/app/model/country';
import { CountryApiResponse } from 'src/app/model/country-api-response';
import { Division } from 'src/app/model/division';
import { DivisionApiResponse } from 'src/app/model/division-api-response';

/**
 *  Add Customer
 *  adds new customer to the database
 *
 */
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerUrl = 'http://localhost:8080/api/customers';
  countryUrl = 'http://localhost:8080/api/countries';
  divisionUrl = 'http://localhost:8080/api/divisions';

  countries: Country[] = [];
  divisions: Division[] = [];

  firstName: string = '';
  lastName: string = '';
  address: string = '';
  postal_code: string = '';
  phone: string = '';
  countryChoice: Country = new Country(0, "", {self: {href: ""}});
  divisionChoice: Division = new Division(0, "", 0, {country: {href: ""}, self: {href: ""}});

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    this.getCountries().subscribe(countries => this.countries = countries);
    this.getDivisions().subscribe(divisions => this.divisions = divisions);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<CountryApiResponse>(this.countryUrl)
      .pipe(
        map(response => response._embedded.countries)
      )
  }

  getDivisions(): Observable<Division[]> {
    return this.http.get<DivisionApiResponse>(this.divisionUrl)
      .pipe(
        map(response => response._embedded.divisions)
      )
  }

  getDivisionsByCountryId(id: any): Division[] {
    return this.divisions.filter(division => {
      return division.country_id == parseInt(id);
    });
  }

  onSubmit() {
    let customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      postal_code: this.postal_code,
      phone: this.phone,
      country: this.countryUrl + "/" + this.countryChoice,
      division: this.divisionUrl + "/" + this.divisionChoice
    }

    // post to customer
    this.http.post(this.customerUrl, customer).subscribe();

    this.router.navigate(["/customer"], ).then(() => {
      window.location.reload();
    });
  }

}
