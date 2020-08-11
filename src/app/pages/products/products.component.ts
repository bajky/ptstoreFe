import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Resource} from "../../model/Resource";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {environment} from "../../../environments/environment";
import {Product} from "../../model/Product";
import {Observable, Subject, Subscription} from "rxjs";
import {debounce, debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  changed = new Subject<string>();
  displayedColumns: string[] = ['productName', 'price', 'description'];
  page = {
    pageIndex:0,
    pageSize:0,
    length:0
  }
  dataSource: MatTableDataSource<Product>;
  filters = {
    with: ''
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private productService: ProductService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>();
    this.getData(0, environment.defaultPageSize);

    this.changed
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => this.getData(0, this.page.pageSize));
  }

  getData(page:number, size: number) {
    console.log(size);
    console.log(page);
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
}
