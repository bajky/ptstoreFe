import {Resource} from "./Resource";
import {Page} from "./Page";

export interface Order extends Resource {
    time: string;
    totalPrice: number;
    page?: Page
}
