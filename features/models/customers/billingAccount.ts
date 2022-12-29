import { AddressInfo } from "./address-info";
import { OrderModel } from "./order";

export interface BillingAccountModel{
    id:number;
    accountNumber:string;
    accountName:string;
    description:string;
    status:string;
    addresses:AddressInfo[];
    orders: OrderModel[];
  }
