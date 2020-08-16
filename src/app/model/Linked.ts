import {Link} from "./Link";

export interface Linked {
  first: Link,
  last: Link,
  next: Link,
  self: Link,
  assets: any[]
}
