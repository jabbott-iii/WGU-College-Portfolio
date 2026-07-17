import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
    {path: 'app', component: AppComponent},
    {path: 'map', component: MapComponent},
    {path: '', redirectTo:'/app', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
