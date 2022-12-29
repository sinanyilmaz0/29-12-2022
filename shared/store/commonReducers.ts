// Store'da değer güncelleyen tüm reducer'ları tanımla...

import { Customer } from "src/app/features/models/customers/customers";
import { customerReducer } from "./customer/customer.reducer";

export const commonReducers = {
  customer:customerReducer,
}

export interface CommonState {
  customer:Customer

}
