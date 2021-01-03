import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  // tslint:disable-next-line:typedef
  private handleProductDetails() {
    const theProductId: number = + this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
}
