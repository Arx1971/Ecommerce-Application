import {Injectable} from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }

  // tslint:disable-next-line:typedef
  addToCart(theCartItem: CartItem) {
    let alreadyExistInCart = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
      // tslint:disable-next-line:triple-equals
      alreadyExistInCart = (existingCartItem != undefined);
    }
    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }

  // tslint:disable-next-line:typedef
  private computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (const currentItem of this.cartItems) {
      totalPriceValue += currentItem.quantity * currentItem.unitPrice;
      totalQuantityValue += currentItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartValue(totalPriceValue, totalQuantityValue);

  }

  // tslint:disable-next-line:typedef
  private logCartValue(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (const tempCartItem of this.cartItems) {
      const subTotal = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, UnitPrice: ${tempCartItem.unitPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('=========================');
  }
}
