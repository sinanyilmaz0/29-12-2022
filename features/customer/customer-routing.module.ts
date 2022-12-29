import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { ContactInfoComponent } from './components/customer-info-components/contact-info/contact-info.component';
import { AddressInfoComponent } from './components/create-customer-components/address-info/address-info.component';
import { AddressInfoDetailsComponent } from './components/create-customer-components/address-info-details/address-info-details.component';
import { ShowAddressComponent } from './components/create-customer-components/show-address/show-address.component';
import { ContactComponent } from './components/create-customer-components/contact/contact.component';
import { DemographicInfoComponent } from './components/create-customer-components/demographic-info/demographic-info.component';
import { CustomerAccountsComponent } from './components/customer-accounts/customer-accounts.component';
import { CustomerInfoComponent } from './components/customer-info-components/customer-info/customer-info.component';



const routes: Routes = [
  // {path:"customer",pathMatch:'full',
  // children:[
  //   {path:'demographic_info',component:DemographicInfoComponent},
  //   {path:'address_info',component:AddressInfoComponent},
  //   ]
  // }
  {path:'customer',
  children:[
    {path:'search',component:SearchCustomerComponent},
    {path: ':id/customer_info', component: CustomerInfoComponent},

    {path:'create_customer',

  children:[
    {path:'',pathMatch:'full',component:DemographicInfoComponent},
    {path:'demographic_info',component:DemographicInfoComponent},
    {path:'address_info', // component:AdressInfoComponent
        // {path:'address_info_details',component:AddressInfoDetailsComponent},
    // {path:'address_info_show',component:ShowAddressComponent},
    // {path:'contact',component:ContactComponent},
  children:[
    { path: '', pathMatch: 'full', component: AddressInfoComponent },
    { path: 'details', component: AddressInfoDetailsComponent },
    { path: 'details/:id', component: AddressInfoDetailsComponent },
    { path: 'list', component: ShowAddressComponent },
  ]
  },
    {path:'contact',component:ContactComponent},
  ]},







//  ------------------------------------------------------------- //

  {path:'customer_info',
  children:[

    // {path:'contact',component:ContactInfoComponent},
    {path:'contact',component:ContactInfoComponent},
  ]
},

//  ------------------------------------------------------------- //


{path:'customer_account',component:CustomerAccountsComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }


//  ------------------------------------------------------------- //
