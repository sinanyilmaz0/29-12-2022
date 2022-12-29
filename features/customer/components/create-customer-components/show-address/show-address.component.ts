import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressInfo } from 'src/app/features/models/customers/address-info';
import { Customer } from 'src/app/features/models/customers/customers';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'etiya-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss']
})
export class ShowAddressComponent implements OnInit {
  displayedColumns: string[] = ['btnRadio', 'city', 'street', 'description'];
  dataSource: AddressInfo[];
  radioBtnValue: AddressInfo;
  currentCustomer: Customer;
  addresses: AddressInfo[];
  selectedDropdownId:number;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomerAddressesFromState();
  }


  toggleDropdown(id){
    if(this.selectedDropdownId==id){
      this.selectedDropdownId=0;
      return;
    }
    this.selectedDropdownId=id;
  }
  getDropdownClass(id){
    return id==this.selectedDropdownId ?  "open show": "";
  }
  getCustomerAddressesFromState() {
    this.customerService.customer$.subscribe((response) => {
      this.currentCustomer = response;

      this.addresses = response.addresses;
      this.dataSource = response.addresses;
    });
  }

  onDelete(id: number) {
    debugger;
    this.customerService.deleteChosenAddressFromState(
      //Number(this.addressId.nativeElement.value)
      id
    );
  }

  onEdit(id: number) {
    debugger;
    this.customerService.editChosenAddressFromState(id);
  }

}
