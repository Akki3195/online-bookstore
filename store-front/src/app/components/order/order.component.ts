import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/constants/app-const';
import { Book } from 'src/app/models/book';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShippingAddress } from 'src/app/models/shipping-address';
import { BillingAddress } from 'src/app/models/billing-address';
import { UserPayment } from 'src/app/models/user-payment';
import { UserService } from 'src/app/services/user.service';
import { UserShipping } from 'src/app/models/user-shipping';
import { UserBilling } from 'src/app/models/user-billing';
import { Payment } from 'src/app/models/payment';
import { Order } from 'src/app/models/order';
import { Router, NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart;
  private cartItemUpdated: boolean;
  private shippingAddress: ShippingAddress = new ShippingAddress();
  private billingAddress: BillingAddress = new BillingAddress();
  private userPayment: UserPayment = new UserPayment();
  private userShipping: UserShipping = new UserShipping();
  private userBilling: UserBilling = new UserBilling();

  private userShippingList: UserShipping[] = [];
  private userPaymentList: UserPayment[] = [];
  private payment: Payment = new Payment();
  private selectedTab: number;
  private emptyShippingList: boolean = true;s
  private emptyPaymentList: boolean = true;
  private stateList: string[] = [];
  private shippingMethod: string;
  private order: Order = new Order();

  constructor(
    private router: Router,
    private cartService: CartService,
    private shippingService: ShippingService,
    private paymentService: PaymentService,
    private checkoutService: CheckoutService,
  ) { }

  onSelecte(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', , this.selectedBook.id]);
  }

  getCartItemList() {
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res as CartItem[];
        this.cartItemNumber = this.cartItemList.length;
        console.log(this.cartItemNumber);
      },
      err => {
        console.log(err);
      }
    );
  }

  setShippingAddress(userShipping: UserShipping) {
  	this.shippingAddress.shippingAddressName = userShipping.userShippingName;
  	this.shippingAddress.shippingAddressStreet1 = userShipping.userShippingStreet1;
  	this.shippingAddress.shippingAddressStreet2 = userShipping.userShippingStreet2;
  	this.shippingAddress.shippingAddressCity = userShipping.userShippingCity;
  	this.shippingAddress.shippingAddressState = userShipping.userShippingState;
  	this.shippingAddress.shippingAddressCountry = userShipping.userShippingCountry;
  	this.shippingAddress.shippingAddressZipCode = userShipping.userShippingZipCode;
  }

  setBillingAddress(userBilling: UserBilling) {
    this.billingAddress.billingAddressName = userBilling.userBillingName;
    this.billingAddress.billingAddressStreet1 = userBilling.userBillingStreet1;
    this.billingAddress.billingAddressStreet2 = userBilling.userBillingStreet2;
    this.billingAddress.billingAddressCity = userBilling.userBillingCity;
    this.billingAddress.billingAddressState = userBilling.userBillingState;
    this.billingAddress.billingAddressCountry = userBilling.userBillingCountry;
    this.billingAddress.billingAddressZipcode = userBilling.userBillingZipcode;
  }

  setPaymentMethod(userPayment: UserPayment) {
    this.payment.type = userPayment.type;
    this.payment.cardNumber = userPayment.cardNumber;
    this.payment.expiryMonth = userPayment.expiryMonth;
    this.payment.expiryYear = userPayment.expiryYear;
    this.payment.cvc = userPayment.cvc;
    this.payment.holderName = userPayment.holderName;
    this.payment.defaultPayment = userPayment.defaultPayment;
    this.payment.holderName = userPayment.holderName;

    this.billingAddress.billingAddressName = this.userBilling.userBillingName;
    this.billingAddress.billingAddressStreet1 = this.userBilling.userBillingStreet1;
    this.billingAddress.billingAddressStreet2 = this.userBilling.userBillingStreet2;
    this.billingAddress.billingAddressCity = this.userBilling.userBillingCity;
    this.billingAddress.billingAddressState = this.userBilling.userBillingState;
    this.billingAddress.billingAddressCountry = this.userBilling.userBillingCountry;
    this.billingAddress.billingAddressZipcode = this.userBilling.userBillingZipcode;
  }

  setBillingAsShipping(checked: boolean) {
    console.log("same as shipping");

    if (checked) {
      this.billingAddress.billingAddressName = this.shippingAddress.shippingAddressName;
      this.billingAddress.billingAddressStreet1 = this.shippingAddress.shippingAddressStreet1;
      this.billingAddress.billingAddressStreet2 = this.shippingAddress.shippingAddressStreet2;
      this.billingAddress.billingAddressCity = this.shippingAddress.shippingAddressCity;
      this.billingAddress.billingAddressState = this.shippingAddress.shippingAddressState;
      this.billingAddress.billingAddressCountry = this.shippingAddress.shippingAddressCountry;
    }
    else{
      this.billingAddress = new BillingAddress();
    }
  }

  getShoppingCart(){
    this.cartService.getShoppingCart().subscribe(
      res => {
        this.shoppingCart = res as ShoppingCart;
        console.log(this.shoppingCart.grandTotal);
      },
      err => {
        console.log(err.text());
      }
    );
  }

  onRemoveCartItem(cartItem: CartItem){
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res);
        this.getCartItemList();
        this.getShoppingCart();
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.checkoutService.checkout(
      this.shippingAddress,
      this.billingAddress,
      this.payment,
      this.shippingMethod).subscribe(
        res => {
          this.order = JSON.parse(JSON.stringify(res));
          console.log(this.order);

          let navigationExtras: NavigationExtras = {
            queryParams: {
              "order": JSON.stringify(this.order)
            }
          }
          this.router.navigate(['/orderSummary'], navigationExtras);
        },
        err => {
          console.log(err.text());
        }
      );

  }


  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
    this.shippingService.getUserShippingList().subscribe(
      res => {
        this.userShippingList = JSON.parse(JSON.stringify(res));
        if (this.userShippingList.length) {
          this.emptyPaymentList = false;

          for (let userShipping of this.userShippingList) {
            if (userShipping.userShippingDefault) {
              this.setShippingAddress(userShipping);
              return;
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    );

    this.paymentService.getUserPaymentList().subscribe(
      res => {
        // this.userPaymentList = JSON.parse(JSON.stringify(res));
        this.userPaymentList = res as UserPayment[];
        if (this.userPaymentList.length) {
          this.emptyPaymentList = false;

          for (let userPayment of this.userPaymentList) {
            if (userPayment.defaultPayment) {
              this.setPaymentMethod(userPayment);
              return;
            }
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    for (let s in AppConst.states) {
      this.stateList.push(s);
    }
    this.payment.type = "";
    this.payment.expiryMonth = "";
    this.billingAddress.billingAddressState = "";
    this.shippingAddress.shippingAddressState = "";
    this.shippingMethod = "groundShipping";
  }
}
