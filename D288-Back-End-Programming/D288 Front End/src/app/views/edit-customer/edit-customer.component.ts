import { HttpClient } from '@angular/common/http';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, NgSelectOption, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, filter } from 'rxjs';

import { Country } from 'src/app/model/country';
import { CountryApiResponse } from 'src/app/model/country-api-response';
import { Customer } from 'src/app/model/customer';
import { Division } from 'src/app/model/division';
import { DivisionApiResponse } from 'src/app/model/division-api-response';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})

export class EditCustomerComponent implements OnInit {

  customerUrl = 'http://localhost:8080/api/customers';
  countryUrl = 'http://localhost:8080/api/countries';
  divisionUrl = 'http://localhost:8080/api/divisions';

  countries: Country[] = [];
  divisions: Division[] = [];
  filteredDivisions: Division[] = [];

  customer: Customer = new Customer(0, '', '','','','', 0, {})
  countryChoice: Country = new Country(0, '', { self: { href: ''} });
  divisionChoice: Division = new Division(0, '', 0, { country: { href: ''}, self: { href: '' }});

  constructor(
    private http: HttpClient,
    private router: Router,
    private form: FormBuilder,
    private changeDetect: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    // Parse customer Id
    this.customer.id = parseInt(this.router.url.split("/")[2])
    let url = this.customerUrl + "/" + this.customer.id

    // Load dropdowns
    this.getCountries().subscribe((countries) => {
      this.countries = countries;

      this.getDivisions().subscribe((divisions) => {
        this.divisions = divisions;

        // Load customer
        this.http.get<Customer>(url).subscribe((customer) => {
          this.customer = customer

          // Load division
          url += "/division";
          this.http.get<Division>(url).subscribe((division) => {
            this.customer.division_id = division.id

            // Customer is fully loaded.
            console.table(this.customer)

            // Select current values from dropdowns
            this.filterDivisionsByCountry(division.country_id);
            let country = (this.getCountryById(division.country_id));

            this.countryChoice = country;
            this.divisionChoice = division;

          });
        });
      });
    });
  }

  ngAfterContentChecked() {
    if( this.filteredDivisions.length > 0 ){
      this.form.control<string>('place')
    }
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

  getCountryById(id: number): Country {
    return this.countries.find(country => {
      return country.id == id
    }) ?? new Country(0,'',{ self: { href: '' } });
  }

  filterDivisionsByCountry(selectedCountry: any) {
    console.table(selectedCountry);
    this.filteredDivisions = this.divisions.filter(division => {
      return division.country_id == parseInt(selectedCountry);
    });
  }

  onSubmit() {
    let customer = {
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      address: this.customer.address,
      postal_code: this.customer.postal_code,
      phone: this.customer.phone,
      division: this.divisionUrl + "/" + this.divisionChoice.id
    }

    // this.http.put(this.customerUrl + "/" + this.customer.id, customer).subscribe();

    this.http.put(this.customerUrl + "/" + this.customer.id, customer).subscribe(
      response => {
        console.log("Customer updated successfully:", response);
      },
      error => {
        console.error("Error updating customer:", error);
      }
    );



    this.router.navigate(["/customer"], ).then(() => {
      window.location.reload();
    });
  }
}
