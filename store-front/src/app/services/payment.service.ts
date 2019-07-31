import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserPayment } from '../models/user-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  newPayment(payment: UserPayment){
    let url = this.serverPath+"/payment/add";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,JSON.stringify(payment),{headers: tokenHeader,responseType: 'text'});
  }

  getUserPaymentList(){
    let url = this.serverPath+"/payment/getUserPaymentList";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.get(url,{headers: tokenHeader,responseType: 'text'});
  }

  removePayment(id: number){
    let url = this.serverPath+"/payment/remove";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,id,{headers: tokenHeader,responseType: 'text'});
  }

  setDefaultPayment(id: number){
    let url = this.serverPath+"/payment/serDefault";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,id,{headers: tokenHeader,responseType: 'text'});
  }
}
