import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpClientModule } from '@angular/common/http';

import { VacationComponent } from './views/vacation/vacation.component';
import { VacationDetailComponent } from './views/vacation-detail/vacation-detail.component';
import { ExcursionComponent } from './views/excursion/excursion.component';
import { ExcursionDetailComponent } from './views/excursion-detail/excursion-detail.component';
import { CartComponent } from './views/cart/cart.component';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';
import { ViewCustomerComponent } from './views/view-customer/view-customer.component';
import { EditCustomerComponent } from './views/edit-customer/edit-customer.component';
import { CartSummaryComponent } from './views/cart-summary/cart-summary.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';
import {PurchaseDataService} from "./services/purchase-data.service";

@NgModule({
  declarations: [
    AppComponent,
    VacationComponent,
    VacationDetailComponent,
    ExcursionComponent,
    ExcursionDetailComponent,
    CartComponent,
    AddCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    CartSummaryComponent,
    OrderConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PurchaseDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
