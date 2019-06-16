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
    this.loginService.sendCredential(form.value.username , form.value.password)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem("xAuthToken",res.json().token);
          this.loggedIn = true;
          location.reload();
        },
        error =>{
          
        }
      );
  }

  ngOnInit() {
    this.loginService.checkSession()
      .subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
        console.log(error);
      }
    );

  }

}
