import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addItem(id: number, qty: number) {
    let url = AppConst.serverPath + "/cart/add";
    let cartItemInfo = {
      "bookId": id,
      "qty": qty
    }
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.http.post(url, cartItemInfo, { headers: tokenHeader, responseType: 'text' });
  }

  getCartItemList() {
    let url = AppConst.serverPath + "/cart/getCartItemList";
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.get(url, { headers: tokenHeader, responseType: 'json' });
  }

  getShoppingCart() {
    let url = AppConst.serverPath + "/cart/getShoppingCart";
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.get(url, { headers: tokenHeader, responseType: 'json' });
  }

  updateCartItem(cartItemId: number, qty: number){
    let url = AppConst.serverPath + "/cart/updateCartItem";
    let cartItemInfo = {
      "cartItemid": cartItemId,
      "qty": qty
    }
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.post(url,cartItemInfo, { headers: tokenHeader, responseType: 'text' });
  }

  removeCartItem(id: number){
    let url = AppConst.serverPath + "/cart/removeCartItem";
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });

    return this.http.post(url,id, { headers: tokenHeader, responseType: 'text' });
  }
}
