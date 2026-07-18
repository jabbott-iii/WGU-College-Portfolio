import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VacationComponent } from './views/vacation/vacation.component';
import { VacationDetailComponent } from './views/vacation-detail/vacation-detail.component';
import { ExcursionComponent } from './views/excursion/excursion.component';
import { ExcursionDetailComponent } from './views/excursion-detail/excursion-detail.component';
import { ViewCustomerComponent } from './views/view-customer/view-customer.component';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';
import { EditCustomerComponent } from './views/edit-customer/edit-customer.component';
import { CartSummaryComponent } from './views/cart-summary/cart-summary.component';
import { OrderConfirmationComponent } from './views/order-confirmation/order-confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: '/vacation', pathMatch: 'full' },
  {path: 'vacation', component: VacationComponent},
  {path: 'vacation-detail/:vacationId', component: VacationDetailComponent},
  {path: 'vacation/:vacationId/excursions', component: ExcursionComponent},
  {path: 'vacation/:vacationId/excursions/:excursionId', component: ExcursionDetailComponent},
  {path: 'customer', component: ViewCustomerComponent},
  {path: 'customer/new', component: AddCustomerComponent},
  {path: 'customer/:customerId', component: EditCustomerComponent},
  {path: 'cart-summary', component: CartSummaryComponent},
  {path: 'order-confirmation', component: OrderConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
