import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {Order} from "../../model/Order";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../../../environments/environment";
import {Resource} from "../../model/Resource";

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {

    displayedColumns: string[] = ['time', 'totalPrice'];
    page = {
      pageIndex:0,
      pageSize:0,
      length:0
    }
    dataSource: MatTableDataSource<Order>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private orderService: OrderService,
                private changeDetectorRefs: ChangeDetectorRef) {
    }

    ngOnInit() {
      this.dataSource = new MatTableDataSource<Order>();
      this.getData(0, environment.defaultPageSize);
    }

    onPageChange(event: PageEvent) {
      this.getData(event.pageIndex, event.pageSize);
    }

    getData(page: number, size: number) {
      this.orderService.getOrdersLoggedUser(page, size).subscribe((resource: Resource) => {
        this.dataSource = new MatTableDataSource<Order>(resource._embedded.orders);
        this.changeDetectorRefs.detectChanges();

        this.page.length = resource.page.totalElements;
        this.page.pageSize = resource.page.size;
        this.page.pageIndex = resource.page.number;
      })
    }
}
