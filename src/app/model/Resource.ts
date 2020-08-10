import {Linked} from "./Linked";
import {Page} from "./Page";

export interface Resource {
  _embedded?: any;
  _links: Linked;
  page?: Page;
}
