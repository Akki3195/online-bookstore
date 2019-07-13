import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  private loggedIn = false;

  constructor(private loginService: LoginService) { }

  onSubmit(form: NgForm){
    let username = form.value.username;
    let password = form.value.password;
    this.loginService.sendCredential(username , password)
      .subscribe(
        res => {
          localStorage.setItem('username',username);
          let jwtToken = JSON.parse(JSON.parse(JSON.stringify(res))._body).token;
          let tokenStr= 'Bearer '+jwtToken;
          localStorage.setItem('token', tokenStr);
          this.loggedIn= true;
          location.reload();
          // localStorage.setItem("xAuthToken",res.json().token);
        },
        error =>{
          console.log(error);
        }
      );
  }

  ngOnInit() {
    if(this.loginService.checkSession()){
      this.loggedIn=true;
    }
    else{
      this.loggedIn=false;
    }
  }

}
