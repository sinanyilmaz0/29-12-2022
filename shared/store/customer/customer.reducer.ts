import {
  addAddressInfo,
  addContactMedium,
  addDemographicInfo,
  clearCustomers,
  deleteChosenAddress,
  editChosenAddress,
  getChosenAddress,
} from './customer.actions';
import { createReducer, on } from '@ngrx/store';

import { Customer } from 'src/app/features/models/customers/customers';

const initialState: Customer = {
  firstName: undefined,
  lastName: undefined,
  birthDate: undefined,
  gender: 'Male',
  nationalityId: undefined,
  addresses: [{addressTitle:'Home', id:1000}],
  contactMedium: undefined
};

export const customerReducer = createReducer(
  initialState,

  on(addDemographicInfo, (state, action) => {
    return { ...state, ...action };
  }),

  on(addAddressInfo, (state, action) => {
    if (state.addresses.length >= 3) {
      return state;
    }

    let addressToUpdate = state.addresses.find(
      (response) => response.id === action.id
    );

    if (!addressToUpdate) {
      let id =
        state.addresses.length <= 0
          ? 1000
          : state.addresses[state.addresses.length - 1].id + 1;

      const newState: Customer = {
        ...state,
        addresses: [...state.addresses, { ...action, id }],
      };
      return newState;
    }
    addressToUpdate = action;

    return {
      ...state,
      addresses: [
        ...state.addresses.filter((c) => c.id != addressToUpdate.id),
        addressToUpdate,
      ].sort((a, b) => a.id - b.id),
    };
  }),

  on(addContactMedium, (state,action) => {
    return { ...state,contactMedium:action };
  }),

  on(clearCustomers, (state, action) => {
    return initialState;
  }),

  on(deleteChosenAddress, (state, action) => {
    return {
      ...state,
      addresses: state.addresses.filter((adress) => adress.id != action.id),
    };
  }),

  on(editChosenAddress, (state, action) => {
    return { ...state, ...action };
  }),

  on(getChosenAddress, (state, action) => {
    return state.addresses.filter((address) => address.id === action.id)[0];
  })
);
