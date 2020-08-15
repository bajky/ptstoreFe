import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number, filters: any, sort: any) {
    let params = new HttpParams()
      .append('page', String(page))
      .append('with', String(filters.with))
      .append('size', String(size))
      .append('sort', `${sort.active ? sort.active : ''},${sort.direction}`)

    return this.http.get(`${environment.apiUrl}/api/products/search/nameStartWith`, {params: params});
  }
}
