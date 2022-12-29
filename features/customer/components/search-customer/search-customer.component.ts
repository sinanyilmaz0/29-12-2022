import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from 'src/app/features/models/customers/customers';
import { CustomerFilterPipe } from '../../pipes/customer-filter.pipe';
import { CustomerService } from '../../services/customer.service';
import { Filter } from 'src/app/features/models/customers/filters';
import { NavbarService } from 'src/app/shared/services/navbar.service';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { PopupModel } from 'src/app/shared/models/popupModel';

@Component({
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit {

  searchFormGroup: FormGroup;
  customers!: Customer[];
  allCustomers!:Customer[];
  filterApplied:boolean=false;

  title:string = "Search Customer"

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
    private customerFilterPipe: CustomerFilterPipe, private popUpService: PopUpService,
    private navbarService: NavbarService, private router: Router){}

  ngOnInit(): void {
    this.getListCustomers();
    this.navbarService.setTitle(this.title)
  }

  getListCustomers() {
    this.customerService.getList().subscribe((response) => {
      this.customers = response;
      this.allCustomers=response;
      console.log(response);
    });
  }

  searchFilter() {
    this.customers = this.customerFilterPipe.transform(
      this.allCustomers,
      this.customerFilter.nationalityId,
      this.customerFilter.id,
      this.customerFilter.firstName,
      this.customerFilter.lastName,
      this.customerFilter.gsmNumber,
      this.customerFilter.orderNumber,
      this.customerFilter.accountNumber
    );
    if(this.customers.length <= 0){
      this.runPopUp()
    }else{
      this.filterApplied=true;
    }
  }

  clearFilter() {
    this.filterApplied=false;
    this.customerFilter = {
      id: null,
      nationalityId: null,
      firstName: '',
      lastName: '',
      gsmNumber: '',
      orderNumber: null,
      accountNumber: '',

    };
  }

  customerFilter: Filter = {
    id: null,
    nationalityId: null,
    firstName: '',
    lastName: '',
    gsmNumber: '',
    orderNumber: null,
    accountNumber: '',
  };

  popUpModel: PopupModel = {
    isOpen: true,
    title: 'No customer found!',
    description: 'Would you like to add a new customer ?',
    icon: 'fa-sharp fa-solid fa-circle-exclamation',
    leftButtonText: 'Cancel',
    rightButtonText: 'Create a new customer',
    clickFunc: () => this.navigate(),

  };
  show: boolean = false;

  navigate(){
    this.popUpService.stopPopUp()
    this.router.navigateByUrl('/customer/create_customer');
  }

  runPopUp() {
    this.popUpService.startPopUp(this.popUpModel);
    this.showPopUp();
  }

  showPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.show = response.isOpen;
      console.log(response);
    });
  }



}
