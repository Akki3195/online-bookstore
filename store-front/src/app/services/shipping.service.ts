import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserShipping } from '../models/user-shipping';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private serverPath: string = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  newShipping(shipping: UserShipping){
    let url = this.serverPath+"/shipping/add";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,JSON.stringify(shipping),{headers: tokenHeader,responseType: 'text'});
  }

  getUserShippingList(){
    let url = this.serverPath+"/shipping/getUserShippingList";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.get(url,{headers: tokenHeader,responseType: 'json'});
  }

  removeShipping(id: number){
    let url = this.serverPath+"/shipping/remove";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,id,{headers: tokenHeader,responseType: 'text'});
  }

  setDefaultShipping(id: number){
    let url = this.serverPath+"/shipping/setDefault";

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url,id,{headers: tokenHeader,responseType: 'text'});
  }

}
