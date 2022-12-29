
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { PopupModel } from 'src/app/shared/models/popupModel';
import { Router } from '@angular/router';
import { Customer } from 'src/app/features/models/customers/customers';
import { CustomerService } from '../../../services/customer.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'etiya-demographic-info',
  templateUrl: './demographic-info.component.html',
  styleUrls: ['./demographic-info.component.scss'],
})

export class DemographicInfoComponent implements OnInit {
  demographicInfoForm!: FormGroup;
  show: boolean = false;

  // formCustomer!:Customer
  dbCustomer!:Customer
  customerToUpdate!:Customer

  title:string = "Create New Customer"


  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private popUpService: PopUpService,
    private customerService:CustomerService,
    private router:Router,
    private navbarService: NavbarService

  ) {}
  ngOnInit(): void {
    this.createDemographicInfoForm();
    this.subsToPopUp();
    this.getCustromerFromState()
    this.navbarService.setTitle(this.title)

  }

  getCustromerFromState(){

    this.customerService.customer$.subscribe((response)=>{
      this.customerToUpdate = response
      this.demographicInfoForm.patchValue(this.customerToUpdate)
    })
  }

  createDemographicInfoForm(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.demographicInfoForm = this.formBuilder.group({
      // can be changed
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: [date, [Validators.required]],
      gender: ['', Validators.required],
      fatherName: ['',],
      motherName: ['',],
      nationalityId: ['', [
        Validators.required,
        // Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(11)
      ]],
    });
  }

  // [Validators.pattern('[a-zA-ZİÖÜĞ]+')]

  subsToPopUp() {
    this.popUpService.isPopUp.subscribe((response) => {
      this.show = response.isOpen;
    });
  }

  getDataFromForm():Customer{
    const customer:Customer = {
      ...this.demographicInfoForm.value,
        firstName: this.demographicInfoForm.value.firstName,
        middleName:this.demographicInfoForm.value.middleName,
        lastName : this.demographicInfoForm.value.lastName ,
        birthDate:this.demographicInfoForm.value.birthDate,
        gender:this.demographicInfoForm.value.gender,
        fatherName:this.demographicInfoForm.value.fatherName,
        motherName:this.demographicInfoForm.value.motherName,
        nationalityId:parseInt(this.demographicInfoForm.value.nationalityId),
        // name:this.demographicInfoForm.value.name.trim()
      }
      Object.keys(customer).map(
        (k) =>
          (customer[k] =
            typeof customer[k] == 'string' ? customer[k].trim() : customer[k])
      );
      return customer
  }

  onDemographicInfoSubmit() {
    if (this.demographicInfoForm.invalid) {
      // console.log(this.demographicInfoForm);
      let p: PopupModel = { isOpen: true, title: 'Warning',icon:'fa-sharp fa-solid fa-circle-exclamation',description:'Please fill in the required fields'};
      this.popUpService.startPopUp(p);
      return;
    }

    this.customerService.getByNationalityId(this.demographicInfoForm.value.nationalityId).subscribe((response)=>{
      this.dbCustomer  = response[0]
      this.customerToUpdate = this.getDataFromForm();
      if (!this.dbCustomer || this.customerToUpdate.nationalityId != this.dbCustomer.nationalityId) {

        this.customerService.addDemographicInfoToState(this.demographicInfoForm.value)

        this.router.navigateByUrl('/customer/create_customer/address_info/list');
        return;
      } else {
        let p: PopupModel = {
          isOpen: true,
          title: 'Warning',
          description: 'A customer already exists with this Nationality ID',
          icon: 'fa-solid fa-circle-exclamation',
        };
        this.popUpService.startPopUp(p);
      }
    })
    }
  }

