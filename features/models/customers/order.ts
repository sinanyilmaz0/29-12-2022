import { OfferModel } from "./offer";

export interface OrderModel{
    id:number;
    orderNumber:number;
    offers: OfferModel[];
}
