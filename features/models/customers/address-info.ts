import { Cities } from "./cities"

export interface AddressInfo {
  id?:number
  city?:Cities
  addressTitle?: string;
  street?:string
  flatNo?:number
  addressDescription?:string
}
