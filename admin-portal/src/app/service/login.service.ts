import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { text } from '@angular/core/src/render3';

@Injectable()
export class LoginService {
  username: String
  constructor(private http: Http) { }

  sendCredential(username: string, password: string){
    let url = "http://localhost:8181/authenticate";
    // let encodedCredential = btoa(username+":"+password); //Encodes UN and Pass into base64
    // let basicHeader = "Basic "+encodedCredential;
    let headers = new Headers({
      'Content-Type' : 'application/json'
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
    let url = "http://localhost:8181/user/logout";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.post(url ,'', {headers: headers});
  }

}
