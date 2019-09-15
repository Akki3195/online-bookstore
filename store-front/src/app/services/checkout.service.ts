import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../constants/app-const';
import { UserShipping } from '../models/user-shipping';
import { UserBilling } from '../models/user-billing';
import { ShippingAddress } from '../models/shipping-address';
import { BillingAddress } from '../models/billing-address';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {



  constructor(private http: HttpClient) { }

  checkout(shippingAddress: ShippingAddress, 
           billingAddress: BillingAddress,
           payment: Payment,
           shippingMethod: string) {
    let url = AppConst.serverPath + "/checkout/checkout";
    let order = {
      "shippingAddress": shippingAddress,
      "billingAddress" : billingAddress,
      "payment" : payment,
      "shippingMethod" : shippingMethod
    }

    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(url,order, { headers: tokenHeader });
  }

  getUserOrder(){
    let url = AppConst.serverPath+"/checkout/getUserOrder";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.get(url,{headers: tokenHeader});
  }
}
