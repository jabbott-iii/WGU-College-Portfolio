import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private sharedService: SharedService) { }
  title = 'd280-javascript-programming-main';
  countryName = '';
  countryCap = '';
  countryIncome = '';
  countryRegion = '';
  countryLat = '';
  countryLong = '';

  getCountryApiData() {
    console.log(this.sharedService.countryApiData)
    const country = this.sharedService.countryApiData[1][0];
    console.log(country);
    this.countryName = country['name'];
    this.countryCap = country['capitalCity'];
    this.countryIncome = country['incomeLevel']['value'];
    this.countryRegion = country['region']['value'];
    this.countryLat = country['latitude']; 
    this.countryLong = country['longitude'];
  }

}