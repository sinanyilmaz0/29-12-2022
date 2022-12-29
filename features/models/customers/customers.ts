import { AddressInfo } from "./address-info"
import { BillingAccountModel } from "./billingAccount"
import { ContactMedium } from "./contact-medium"

export interface Customer {
  id?:number
  customerId?:number;
  firstName?:string
  middleName?:string
  lastName?:string
  birthDate?:string
  gender?:string
  motherName?:string
  fatherName?:string
  nationalityId?:number
  role?: string ;

  addresses?:AddressInfo[]
  contactMedium?:ContactMedium
  billingAccounts?:BillingAccountModel[];
}
