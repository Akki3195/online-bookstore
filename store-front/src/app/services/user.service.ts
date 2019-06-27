import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {
  private serverPath: string = AppConst.serverPath;

  constructor(private http:HttpClient) { }

  newUser(userName:string, email:string){
    let url = this.serverPath+'/user/newUser';
    let userInfo = {
      "username": userName,
      "email": email
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url,JSON.stringify(userInfo), {headers: tokenHeader});
  }

  retrievePassword(email:string){
    let url = this.serverPath+'/user/forgetPassword';
    let userInfo = {
      "email": email
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url,JSON.stringify(userInfo), {headers: tokenHeader});
  }
}
