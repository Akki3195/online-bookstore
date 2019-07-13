import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  private serverPath : string = AppConst.serverPath;
  constructor(private http: HttpClient,private router: Router) { }

  sendCredential(username: string,password: string){
    let url = this.serverPath+'/authenticate';
    // let encodedCredential = btoa(username+":"+password);
    // let basicHeader = "Basic "+encodedCredential;
    let headers = new HttpHeaders({
      // 'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Type' :  'application/json'
      // 'Authorization' : basicHeader
    });

    return this.http.post(url,{username,password},{headers: headers});
  }

  checkSession(){
    let user = localStorage.getItem('username');
    if(!(user === null)){
      return true;
    }
    else 
    return false;
  }

  logout(){
    let url = this.serverPath+'/user/logout';
    let headers = new HttpHeaders({
      'Authorization' : localStorage.getItem('token')
      // 'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, '',{headers: headers,responseType: 'text'});
  }
}
