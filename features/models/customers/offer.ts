import { ProductModel } from './product';
import { TypeModel } from './type';

export interface OfferModel {
  id: number;
  type:TypeModel;
  name: string;
  products: ProductModel[];
}
