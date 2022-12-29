import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';


import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CustomerFilterPipe } from './pipes/customer-filter.pipe';

import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { ContactInfoComponent } from './components/customer-info-components/contact-info/contact-info.component';
import { AddressInfoComponent } from './components/create-customer-components/address-info/address-info.component';
import { AddressInfoDetailsComponent } from './components/create-customer-components/address-info-details/address-info-details.component';
import { ShowAddressComponent } from './components/create-customer-components/show-address/show-address.component';
import { ContactComponent } from './components/create-customer-components/contact/contact.component';
import { DemographicInfoComponent } from './components/create-customer-components/demographic-info/demographic-info.component';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { CustomerAccountsComponent } from './components/customer-accounts/customer-accounts.component';
import { CustomerInfoComponent } from './components/customer-info-components/customer-info/customer-info.component';
@NgModule({
  declarations: [
    DemographicInfoComponent,
    AddressInfoComponent,
    AddressInfoDetailsComponent,
    ShowAddressComponent,
    ContactComponent,

    ContactInfoComponent,
    CustomerAccountsComponent,
    SearchCustomerComponent,
    CustomerFilterPipe,
    CustomerInfoComponent,

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    AccordionModule,
    MatIconModule,
    MatMenuModule,
    MenuModule,
    RippleModule,
    ButtonModule

  ],
  exports:[],
  providers: [DatePipe,CustomerFilterPipe],
})
export class CustomerModule {}
