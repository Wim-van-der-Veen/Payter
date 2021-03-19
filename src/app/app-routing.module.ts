import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, OverviewComponent, DetailsComponent, NewItemComponent } from './components';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: 'items', children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'new', component: NewItemComponent },
  ]},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
