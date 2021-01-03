import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  // tslint:disable-next-line:typedef
  private listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotals();

  }

  // tslint:disable-next-line:typedef
  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  // tslint:disable-next-line:typedef
  decrementItem(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }

  // tslint:disable-next-line:typedef
  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
