export class User {
  id?: string;
  userName: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  _links?: {
    orders: any,
    self: any
  }
}
