import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddressInfo } from 'src/app/features/models/customers/address-info';
import { Cities } from 'src/app/features/models/customers/cities';
import { CitiesService } from '../../../services/cities.service';
import { Customer } from 'src/app/features/models/customers/customers';
import { CustomerService } from '../../../services/customer.service';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { PopupModel } from 'src/app/shared/models/popupModel';

@Component({
  selector: 'app-address-info-details',
  templateUrl: './address-info-details.component.html',
  styleUrls: ['./address-info-details.component.scss'],
})


export class AddressInfoDetailsComponent implements OnInit {
  addressInfoForm!: FormGroup;
  show: boolean = false;
  id: number;
  cities:Cities[];
  selectedCity:Cities;


  formCustomer: Customer; //form
  customerToUpdate: Customer; //state
  customerAddresstoUpdate: AddressInfo[];

  items: any[];
  item:string;

  constructor(
    private formBuilder: FormBuilder,
    private customerService:CustomerService,
    private citiesService:CitiesService,
    private popUpService: PopUpService,
    private activatedRoute:ActivatedRoute,

    private router:Router

  ) {this.items = [];
    for (let i = 0; i < 10000; i++) {
        this.items.push({label: 'Item ' + i, value: 'Item ' + i});
    }}

  ngOnInit(): void {
    this.createAddressInfoForm();
    this.subsToPopUp()
    this.getCities();
    this.getIdIfExists();


  }


  getIdIfExists() {
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.id = param['id'];
      }
      // this.createAddressInfoForm();
      this.getCustomerFromState();
      // this.subs();
    });
  }


  getDataFromForm(): AddressInfo {
    const customerAdressInfo: AddressInfo = {
      ...this.addressInfoForm.value,
      city: this.addressInfoForm.value.city,
      addressTitle: this.addressInfoForm.value.addressTitle,
      street: this.addressInfoForm.value.street,
      flatNumber: Number(this.addressInfoForm.value.flatNumber),
      description: this.addressInfoForm.value.description,
    };

    Object.keys(customerAdressInfo).map(
      (k) =>
        (customerAdressInfo[k] =
          typeof customerAdressInfo[k] == 'string'
            ? customerAdressInfo[k].trim()
            : customerAdressInfo[k])
    );

    return customerAdressInfo;
  }


  getCustomerFromState() {
    this.customerService.customer$.subscribe((response) => {
      this.customerToUpdate = response;
      this.customerAddresstoUpdate = response.addresses;
      if (this.id > 0) {
        let address =  this.customerToUpdate.addresses.find((i) => i.id == this.id);
        this.addressInfoForm.patchValue(address);
        this.addressInfoForm.value.city=address.city;
        this.selectedCity=address.city;
      }
    });
  }





  getCities() {
    this.citiesService.getList().subscribe((response:Cities[])=>{
      this.cities=response

      console.log(this.cities);
   } );
  }

  createAddressInfoForm(): void {
    this.addressInfoForm = this.formBuilder.group({
      // can be changed
      id: [this.id || 0],
      city: ['',[Validators.required]],
      addressTitle: ['', [Validators.required]],
      // town: ['',[Validators.required,Validators.minLength(2)]],
      street: ['',[Validators.required,Validators.minLength(2)]],
      flatNo: ['',Validators.required],
      addressDescription: [''],
    });
  }

  subsToPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.show = response.isOpen;
    });
  }

  onAddressInfoSubmit() {
    if(this.addressInfoForm.invalid){
    let p: PopupModel = { isOpen: true, title: 'Warning',icon:'fa-sharp fa-solid fa-circle-exclamation',description:'Please fill in the required fields'};
    this.popUpService.startPopUp(p);
    return
    }
    this.customerService.addAddressInfoToState({...this.addressInfoForm.value,city:this.addressInfoForm.value.city})
    this.router.navigateByUrl("/customer/create_customer/address_info/list")
    }
  }

