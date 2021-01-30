import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OnlineShopFormService} from '../../services/online-shop-form.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFromGroup: FormGroup;

  expirationMonths: number [] = [];
  expirationYears: number [] = [];
  totalPrice = 0;
  totalQuantity = 0;

  countries: Country[] = [];
  states: State[] = [];

  constructor(private formBuilder: FormBuilder, private onlineShopFormService: OnlineShopFormService) {
  }

  ngOnInit(): void {
    this.checkoutFromGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipcode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
    this.onlineShopFormService.getCreditCardYears().subscribe(data => {
      this.expirationYears = data;
    });
    this.handleExpirationsMonthAndYear();
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log('Handling the Submission');
    console.log(this.checkoutFromGroup.get('customer').value);
    console.log(this.checkoutFromGroup.get('shippingAddress').value);
    console.log(this.checkoutFromGroup.get('billingAddress').value);
    console.log(this.checkoutFromGroup.get('creditCard').value);
  }


  // tslint:disable-next-line:typedef
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFromGroup.controls.billingAddress.setValue(
        this.checkoutFromGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFromGroup.controls.billingAddress.reset();
    }
  }

  // tslint:disable-next-line:typedef
  handleExpirationsMonthAndYear() {
    const startYear: number = new Date().getFullYear();
    const currentYear: number = this.checkoutFromGroup.get('creditCard').value.expirationYear;
    let startMonth = 0;
    if (startYear === currentYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.onlineShopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      this.expirationMonths = data;
    });
  }
}
