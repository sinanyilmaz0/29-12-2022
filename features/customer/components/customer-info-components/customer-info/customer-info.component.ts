import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from 'src/app/features/models/customers/customers';
import { CustomerService } from '../../../services/customer.service';
import { DatePipe } from '@angular/common';
import { PopUpService } from 'src/app/shared/services/pop-up.service';
import { PopupModel } from 'src/app/shared/models/popupModel';

@Component({
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
})
export class CustomerInfoComponent implements OnInit {
  customerInfoForm!: FormGroup;
  show: boolean = false;
  editCustomer: boolean = false;

  formCustomer!: Customer;
  dbCustomer!: Customer;
  customerToUpdate!: Customer;

  customers!: Customer[];
  nid!: number;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private popUpService: PopUpService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createCustomerInfoForm();
    this.getCustomerIdFromRoute();
  }

  createCustomerInfoForm(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.customerInfoForm = this.formBuilder.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZİÖÜĞ]+')],
      ],
      middleName: ['', Validators.pattern('[a-zA-ZİÖÜĞ]+')],
      lastName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-ZİÖÜĞ]+')],
      ],
      birthDate: [date, [Validators.required]],
      gender: ['', [Validators.required, Validators.pattern('[a-zA-ZİÖÜĞ]+')]],
      fatherName: ['', [Validators.pattern('[a-zA-ZİÖÜĞ]+')]],
      motherName: ['', [Validators.pattern('[a-zA-ZİÖÜĞ]+')]],
      nationalityId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.min(0),
        ],
      ],
    });
  }
  cancel() {
    this.editCustomer = false;
    this.getCustomerIdFromRoute();
  }

  clickUpdate() {
    this.editCustomer = !this.editCustomer;
  }
  clickToDelete() {
    let p: PopupModel = {
      isOpen: true,
      title: 'Warning!',
      description: 'Are you sure to delete this customer ?',
      icon: 'fa-sharp fa-solid fa-circle-exclamation',
      leftButtonText: 'Cancel',
      rightButtonText: 'Delete',
      clickFunc: () => this.deleteCustomer(this.id),
    };

    this.popUpService.startPopUp(p);
  }

  getCustomer(id: number) {
    this.customerService.getById(id).subscribe((response) => {
      this.customerToUpdate = response;
      let date = this.datePipe.transform(
        this.customerToUpdate[0].birthDate,
        'yyyy-MM-dd'
      );
      this.customerToUpdate[0].birthDate = date;
      this.customerInfoForm.patchValue({ ...this.customerToUpdate[0] });

      console.log(date);
    });
  }
  id!: number;
  getCustomerIdFromRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCustomer(params['id']);
        this.id = params['id'];
      }
    });
  }

  deleteCustomer(id: number) {
    if (
      this.customerToUpdate[0].billingAccounts && this.customerToUpdate[0].billingAccounts.find((c) => c.status == 'active'  )
    ) {
      let statusErrorPopUp: PopupModel = {
        isOpen: true,
        title: 'Warning',
        description:
          'Since the customer has active products, the customer cannot be deleted.',
        icon: 'fa-sharp fa-solid fa-circle-exclamation',
      };
      this.popUpService.startPopUp(statusErrorPopUp);
    } else {
      this.customerService.deleteCustomer(id).subscribe(() => {
        this.popUpService.stopPopUp();
        this.router.navigate(['/customer/search']);
      });
    }
  }

  update(): void {
    const request: Customer = {
      ...this.customerToUpdate[0],
      id: this.id,
      firstName: this.customerInfoForm.value.firstName,
      middleName: this.customerInfoForm.value.middleName,
      lastName: this.customerInfoForm.value.lastName,
      birthDate: this.customerInfoForm.value.birthDate,
      gender: this.customerInfoForm.value.gender,
      fatherName: this.customerInfoForm.value.fatherName,
      motherName: this.customerInfoForm.value.motherName,
      nationalityId: this.customerInfoForm.value.nationalityId,
    };

    this.customerService.getById(this.id).subscribe((response) => {
      this.nid = response[0].nationalityId;
    });

    this.customerService.getList().subscribe((response) => {
      this.customers = response;
      if (
        response.find((c) => c.nationalityId == request.nationalityId) &&
        request.nationalityId != this.nid
      ) {
        let errorIdNumber: PopupModel = {
          isOpen: true,
          title: 'Warning!',
          description: 'A customer is already exist with this NationalityId',
          icon: 'fa-sharp fa-solid fa-circle-exclamation',
        };
        this.popUpService.startPopUp(errorIdNumber);
      } else {
        this.customerService.updateCustomer(request).subscribe((response) => {
          this.editCustomer = false;

          let createdCustumerPopUp: PopupModel = {
            isOpen: true,
            title: 'Successful',
            description: 'This customer updated successfully',
            icon: 'fa-solid fa-circle-check',
          };
          this.popUpService.startPopUp(createdCustumerPopUp);
        });
      }
    });
  }
}
