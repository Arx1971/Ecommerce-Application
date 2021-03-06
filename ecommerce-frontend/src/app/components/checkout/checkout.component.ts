import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {OnlineShopFormService} from '../../services/online-shop-form.service';
import {State} from '../../common/state';
import {Country} from '../../common/country';
import {CustomValidator} from '../../validators/custom-validator';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice = 0;
  totalQuantity = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private onlineShopFormService: OnlineShopFormService, private cartService: CartService) {
  }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
            Validators.minLength(2),
            CustomValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('',
          [Validators.required, Validators.minLength(2),
            CustomValidator.notOnlyWhiteSpace]),
        email: new FormControl('',
          [Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),
          CustomValidator.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.onlineShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.onlineShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log('Retrieved credit card years: ' + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
    this.onlineShopFormService.getCountries().subscribe(
      data => {
        console.log('Retrieved countries: ' + JSON.stringify(data));
        this.countries = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  // tslint:disable-next-line:typedef
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  // tslint:disable-next-line:typedef
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  // tslint:disable-next-line:typedef
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  // tslint:disable-next-line:typedef
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  // tslint:disable-next-line:typedef
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  // tslint:disable-next-line:typedef
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  // tslint:disable-next-line:typedef
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  // tslint:disable-next-line:typedef
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  // tslint:disable-next-line:typedef
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  // tslint:disable-next-line:typedef
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  // tslint:disable-next-line:typedef
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  // tslint:disable-next-line:typedef
  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  // tslint:disable-next-line:typedef
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  // tslint:disable-next-line:typedef
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  // tslint:disable-next-line:typedef
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }


  // tslint:disable-next-line:typedef
  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
        .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }

  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log('Handling the submit button');

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log('The email address is ' + this.checkoutFormGroup.get('customer').value.email);

    console.log('The shipping address country is ' + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log('The shipping address state is ' + this.checkoutFormGroup.get('shippingAddress').value.state.name);

  }

  // tslint:disable-next-line:typedef
  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.onlineShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  // tslint:disable-next-line:typedef
  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.onlineShopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

  // tslint:disable-next-line:typedef
  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    });
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });
  }
}
