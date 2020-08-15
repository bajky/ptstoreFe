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
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
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
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productService: ProductService,
              private changeDetectorRefs: ChangeDetectorRef,
              private orderService: OrderService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getData(0, environment.defaultPageSize);
    if (this.authService.isAuthenticated()) {
      this.dynamicColumns.forEach(column => this.displayedColumns.push(column));
    }
    this.changed
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.getData(0, this.page.pageSize));
  }

  getData(page:number, size: number) {
    this.productService.getProducts(page, size, this.filters, this.sort ? this.sort : {}).subscribe((resource: Resource) => {
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

  addToBasket(product: Product) {
    this.products.push(product);
  }

  removeFromBasket(toRemove: Product) {
    let index = this.products.findIndex(product => product._links.self.href === toRemove._links.self.href);
    this.products.splice(index, 1);
  }

  createOrder() {
    let productLinks = this.products.map(product => product._links.self.href);
    this.orderService.createOrder(productLinks).subscribe((data: Resource) => {
      this.showInfo = true;
    }, () => this.showDanger = true);
  }

  getAmountByUrl(searchingProd: Product): number {
    return this.products.filter(product => product._links.self.href == searchingProd._links.self.href).length;
  }

  getTotalPrice() {
    return this.products.map(product => product.price)
      .reduce((a, b) => a + b, 0);
  }

  closeDanger() {
    this.showDanger = false;
  }

  closeInfo() {
    this.showInfo = false;
  }

  sortChange() {
    this.getData(this.page.pageIndex, this.page.pageSize);
  }
}
