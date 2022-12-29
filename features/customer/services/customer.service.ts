import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CommonState } from 'src/app/shared/store/commonReducers';
import { Customer } from '../../models/customers/customers';
import { AddressInfo } from '../../models/customers/address-info';
import { CustomerDemographicInfo } from '../../models/customers/demographic-info';
import { ContactMedium } from '../../models/customers/contact-medium';
import { addAddressInfo, addContactMedium, addDemographicInfo, clearCustomers, deleteChosenAddress, editChosenAddress } from 'src/app/shared/store/customer/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  controllerUrl = `${environment.apiUrl}/customers`;

  customer$: Observable<Customer> = this.store.select(
    (state) => state.customer
  );

  addressToUpdate: AddressInfo;

  constructor(
    private httpClient: HttpClient,
    private store: Store<CommonState>
  ) {}

  getByNationalityId(nationalityId: number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      `${this.controllerUrl}?nationalityId=${nationalityId}`
    );
  }


  getList(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.controllerUrl}`);
  }

  add(customer: Customer): Observable<Customer> {
    // ekleyeceğimiz şey 2.parametre post işleminde.
    return this.httpClient.post<Customer>(this.controllerUrl, customer);
  }



  // -------------------------
  getById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.controllerUrl}?id=${id}`);
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.httpClient.delete<Customer>(
      `${this.controllerUrl}/${id}`
    );
  }

  updateCustomer(request: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.controllerUrl}/${id}`)
  }


    // -------------------------


  addDemographicInfoToState(info: CustomerDemographicInfo) {
    this.store.dispatch(addDemographicInfo(info));
  }

  addAddressInfoToState(info: AddressInfo) {
    this.store.dispatch(addAddressInfo(info));
  }

  addContactMediumToState(info: ContactMedium) {
    this.store.dispatch(addContactMedium(info));
  }

  clearState(customer: Customer) {
    this.store.dispatch(clearCustomers(customer));
  }

  deleteChosenAddressFromState(id: number) {
    this.store.dispatch(deleteChosenAddress({ id }));
  }

  editChosenAddressFromState(id: number) {
    this.store.dispatch(editChosenAddress({ id }));
  }

  getGivenCustomerAddressFromState(id: number) {
    this.customer$.subscribe((response) => {
      this.addressToUpdate = response.addresses.find((c) => c.id === id);
    });
  }
}


