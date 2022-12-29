import { createAction, props } from "@ngrx/store";

import { AddressInfo } from "src/app/features/models/customers/address-info";
import { ContactMedium } from "src/app/features/models/customers/contact-medium";
import { Customer } from "src/app/features/models/customers/customers";
import { CustomerDemographicInfo } from "src/app/features/models/customers/demographic-info";

export const addDemographicInfo = createAction(
  '[Customer] Add Demographic Info',
  props<CustomerDemographicInfo>()
);

export const addAddressInfo = createAction(
  '[Customer] Add Address Info',
  props<AddressInfo>()
);

export const addContactMedium = createAction(
  '[Customer] Add Contact Medium',
  props<ContactMedium>()
);

export const clearCustomers = createAction(
  'Deletes All Customers',
  props<Customer>()
);

export const deleteChosenAddress = createAction(
  'Deletes Chosen Address',
  props<{ id: number }>()
);

export const editChosenAddress = createAction(
  'Edits Chosen Address',
  props<{ id: number }>()
);

export const getChosenAddress = createAction(
  'Edits Chosen Address',
  props<{ id: number }>()
);
