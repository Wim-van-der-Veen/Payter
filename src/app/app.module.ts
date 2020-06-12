import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent, MenuComponent, OverviewComponent, DetailsComponent, NewItemComponent, DashboardComponent } from 'app/components';

import { DataService } from 'app/services/data';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    OverviewComponent,
    DetailsComponent,
    NewItemComponent,
    DashboardComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
