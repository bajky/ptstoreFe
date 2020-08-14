import {Resource} from "./Resource";

export interface Product extends Resource {
  id: number;
  productName: string;
  price: number;
  description?: string;
  category: string;
}
