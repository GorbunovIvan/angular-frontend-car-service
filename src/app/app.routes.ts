import { Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarFormComponent } from './car-form/car-form.component';

export const routes: Routes = [
  { path: 'cars', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'cars/new/form', component: CarFormComponent },
  { path: 'cars/:id/edit', component: CarFormComponent },
  { path: '', redirectTo: '/cars', pathMatch: 'full' }  // Redirecting to '/cars' if address is empty
];
