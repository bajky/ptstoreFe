import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Resource} from "../../model/Resource";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {environment} from "../../../environments/environment";
import {Product} from "../../model/Product";
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {OrderService} from "../../service/order/order.service";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: string[] = [];
  changed = new Subject<string>();
  displayedColumns: string[] = ['productName', 'price', 'category', 'description'];
  dynamicColumns = ['actions', 'amount']
  page = {
    pageIndex:0,
    pageSize:0,
    length:0
  }
  dataSource: MatTableDataSource<Product>;
  filters = {
    with: ''
  }

  showDanger = false;
  showInfo = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private productService: ProductService,
              private changeDetectorRefs: ChangeDetectorRef,
              private orderService: OrderService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.router.url.indexOf('dashbosard'));
    this.dataSource = new MatTableDataSource<Product>();
    this.getData(0, environment.defaultPageSize);
    if (this.authService.isAuthenticated()) {
      this.dynamicColumns.forEach(column => this.displayedColumns.push(column));
    }
    this.changed
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.getData(0, this.page.pageSize));
  }

  getData(page:number, size: number) {
    this.productService.getProducts(page, size, this.filters).subscribe((resource: Resource) => {
      this.dataSource = new MatTableDataSource<Product>(resource._embedded.products);
      this.changeDetectorRefs.detectChanges();

      this.page.length = resource.page.totalElements;
      this.page.pageSize = resource.page.size;
      this.page.pageIndex = resource.page.number;
    })
  }

  onPageChange(event: PageEvent) {
    this.getData(event.pageIndex, event.pageSize);
  }

  onFilterChange(event) {
    this.changed.next(event);
  }

  addToBasket(productUrl: string) {
    this.products.push(productUrl);
  }

  createOrder() {
    this.orderService.createOrder(this.products).subscribe((data: Resource) => {
      this.showInfo = true;
    }, (error) => this.showDanger = true);
  }

  getAmountByUrl(productUri): number {
    return this.products.filter(item => item == productUri).length;
  }

  closeDanger() {
    this.showDanger = false;
  }

  closeInfo() {
    this.showInfo = false;
  }
}
