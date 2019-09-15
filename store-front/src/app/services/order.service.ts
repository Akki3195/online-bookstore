import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../constants/app-const';

@Injectable()
export class OrderService {



  constructor(private http: HttpClient) { }

  getOrderList(){
    let url = AppConst.serverPath+"/order/getOrderList";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.get(url,{headers: tokenHeader});
  }
}
