import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Product} from "../../model/Product";
import {AssetsService} from "../../service/assets/assets.service";
import {Resource} from "../../model/Resource";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  productImageLinks: string[];
  activeIndex: number = 0;
  constructor(private router: Router, private assetService: AssetsService) {
    if (!this.router.getCurrentNavigation().extras.state) {
      router.navigate(['/dashboard/products'])
    }
    this.product = this.router.getCurrentNavigation().extras.state.product;
  }

  ngOnInit(): void {
    this.assetService.getAssetsForProduct(this.product.productName)
      .subscribe((resource: Resource) => {
        this.productImageLinks = resource._links.assets.map(asset => asset.href)
      });
  }

  onNext() {
    if (this.activeIndex >= this.productImageLinks.length - 1) {
      this.activeIndex = 0
    } else {
      this.activeIndex++;
    }
    console.log(this.activeIndex)
  }

  onPrev() {
    if (this.activeIndex <= 0) {
      this.activeIndex = this.productImageLinks.length - 1
    } else {
      this.activeIndex--;
    }
    console.log(this.activeIndex)

  }
}
