import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

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
      // 'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url,JSON.stringify(userInfo), {headers: tokenHeader,responseType: 'text'});
  }

  updateUserInfo(user: User,newPassword: string){
    let url = this.serverPath+"/user/updateUserInfo";
    let userInfo = {
      "id" : user.id,
      "firstName" : user.userName,
      "lastName" : user.lastName,
      "username" : user.userName,
      "currentPassword" : user.password,
      "email" : user.email,
      "newPassword" : "newPassword"
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem("xAuthToken")
    });
    return this.http.post(url,JSON.stringify(userInfo),{headers: tokenHeader,responseType :'text'});
  }

  getCurrentUser(){
    let url = this.serverPath+'/user/getCurrentUser';
    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      // 'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url,{headers: tokenHeader,responseType: 'json'});
  
  }

  retrievePassword(email:string){
    let url = this.serverPath+'/user/forgetPassword';
    let userInfo = {
      "email": email
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      // 'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url,JSON.stringify(userInfo), {headers: tokenHeader,responseType: 'text'});
  }
}
