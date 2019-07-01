import { Injectable } from '@angular/core';
import { AppConst } from '../constants/app-const';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { text } from '@angular/core/src/render3';

@Injectable()
export class LoginService {

  private serverPath : string = AppConst.serverPath;
  constructor(private http: HttpClient,private router: Router) { }

  sendCredential(username: string,password: string){
    let url = this.serverPath+'/token';
    let encodedCredential = btoa(username+":"+password);
    let basicHeader = "Basic "+encodedCredential;
    let headers = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : basicHeader
    });

    return this.http.get(url,{headers: headers});
  }

  checkSession(){
    let url = this.serverPath+'/checkSession';
    let headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.get(url,{headers: headers,responseType:'text'});
  }

  logout(){
    let url = this.serverPath+'/user/logout';
    let headers = new HttpHeaders({
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, '',{headers: headers,responseType: 'text'});
  }
}
