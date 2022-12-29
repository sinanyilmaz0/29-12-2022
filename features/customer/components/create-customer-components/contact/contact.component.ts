import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupModel } from 'src/app/shared/models/popupModel';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import {  Router } from '@angular/router';
import { Customer } from 'src/app/features/models/customers/customers';
import { ContactMedium } from 'src/app/features/models/customers/contact-medium';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'etiya-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

  contactMediumForm!: FormGroup;
  customerToUpdate: Customer; //state
  customerContactMediumToUpdate: ContactMedium;

  customers!:Customer[]
  showPopUp: boolean = false;
  lastId!:number

  submitted = true;



  constructor(
    private formBuilder: FormBuilder,
    private popUpService: PopUpService,
    private customerService: CustomerService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createContactMediumForm();
    this.subsToPopUp();
    this.getCustomerFromState();
  }


  createContactMediumForm(): void {
    this.contactMediumForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      homePhone: [''],
      mobilePhone: ['', [Validators.required]],
      fax: [''],
    });
  }

  subsToPopUp() {
    // this.popUpService.isPopUp.subscribe((response) => {
    //   this.showPopUp = response.isOpen;
    // });
  }

  get f() {
    return this.contactMediumForm.controls;
  }

  getDataFromForm(): ContactMedium {
    const customerContactMediumInfo: ContactMedium = {
      ...this.contactMediumForm.value,
      email: this.contactMediumForm.value.email,
      homePhone: this.contactMediumForm.value.homePhone,
      mobilePhone: this.contactMediumForm.value.mobilePhone,
      fax: this.contactMediumForm.value.fax,
    };

    Object.keys(customerContactMediumInfo).map(
      (k) =>
        (customerContactMediumInfo[k] =
          typeof customerContactMediumInfo[k] == 'string'
            ? customerContactMediumInfo[k].trim()
            : customerContactMediumInfo[k])
    );

    return customerContactMediumInfo;
  }


  getCustomerFromState() {
    this.customerService.customer$.subscribe((response) => {
      this.customerToUpdate = response;
      this.customerContactMediumToUpdate = response.contactMedium[0];
      this.contactMediumForm.patchValue(this.customerContactMediumToUpdate);
    });
  }

  contactMediumSubmit() {

    if ( !this.contactMediumForm.value['email'] && !this.contactMediumForm.value['mobilePhone'] ) {
      let p: PopupModel = {
        isOpen: true,
        title: 'Warning',
        icon: 'fa-sharp fa-solid fa-circle-exclamation',
        description: "E-mail and Mobile Number areas can't be empty!",
        showOverlay:false
      };
       this.popUpService.startPopUp(p);
      return;
    }

    else if(this.contactMediumForm.invalid){
      let p: PopupModel = {
        isOpen: true,
        title: 'Warning',
        icon: 'fa-sharp fa-solid fa-circle-exclamation',
        description: "Please fill in the required fields completely",
        showOverlay:false
      };
       this.popUpService.startPopUp(p);
      return;
    }

      this.customerService.getList().subscribe( (response)=>{
      this.customers = response;
      let customer = this.customers.find(c=>c.contactMedium && (c.contactMedium.email === this.contactMediumForm.value.email || c.contactMedium.mobilePhone == this.contactMediumForm.value.mobilePhone))
      if(customer){
        let p: PopupModel = {
          isOpen: true,
          title: 'Warning',
          icon: 'fa-sharp fa-solid fa-circle-exclamation',
          description: "A customer is already exist with this E-mail or Mobile Number",
        };
        this.popUpService.startPopUp(p)

        return
      }

      this.submitted = false;

      this.customerContactMediumToUpdate = { ...this.getDataFromForm() };
      this.customerToUpdate = {
      ...this.customerToUpdate,
      contactMedium: this.customerContactMediumToUpdate}
      this.customerService.add(this.customerToUpdate).subscribe(response=>{
      this.customerService.clearState(this.customerToUpdate);
        this.router.navigateByUrl("/customer/"+ response.id+ "/customer_info")
      });
    }
    )



    // !!!!!!
    // this.router.navigateByUrl("/customer/customer_account")
    // !!!!!!


  }
}





