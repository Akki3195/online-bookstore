import { Component, OnInit, ApplicationInitStatus } from '@angular/core';
import { AppConst } from 'src/app/constants/app-const';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private loginError: boolean = false;
  private loggedIn = false;
  private credential = {'username' : '','password': ''};

  private emailSent: boolean = false;
  private userNameExists: boolean;
  private emailExists: boolean;
  private username: string;
  private email: string;
  private recoverEmail: string;

  private emailNotExists: boolean= false;
  private forgetPasswordEmailSent: boolean;

  constructor(private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  onNewAccount(){
    this.userNameExists = false;
    this.emailExists = false;
    this.emailSent = false;

    this.userService.newUser(this.username,this.email).subscribe(
      res => {
        console.log(res);
        this.emailSent = true;
      },
      error => {
        let errorMessage = JSON.parse(JSON.stringify(error)).error;
        if(errorMessage === "Username Exists")
         this.userNameExists = true;
        if(errorMessage === "Email Exists")
         this.emailExists = true;
      }
    );
  } 

  onForgetPassword(){
    this.forgetPasswordEmailSent = false;
    this.emailNotExists = false;
    
    this.userService.retrievePassword(this.recoverEmail).subscribe(
      res => {
        console.log(res);
        this.forgetPasswordEmailSent = true;
      },
      error => {
        let errorMessage = JSON.parse(JSON.stringify(error)).error;;
        if(errorMessage === "Email not found")
         this.emailExists = true;
      }
    );
  }

  onLogin() {
    this.loginService.sendCredential(this.credential.username,this.credential.password).subscribe(
      res => {
        console.log(JSON.parse(JSON.stringify(res)).token);
        localStorage.setItem('username',this.credential.username);
        let jwtToken = JSON.parse(JSON.stringify(res)).token;
        let tokenStr= 'Bearer '+jwtToken;
        localStorage.setItem('token', tokenStr);
        this.loggedIn= true;

        window.open('/home','_self');
        // location.reload();
        // this.router.navigate(['home']);
        // console.log("From onLogin method "+res);
        // // localStorage.setItem("xAuthToken",JSON.parse(JSON.stringify(res)).token);
      },
      error => {
        this.loggedIn = false;
        this.loginError = true;

      }
    );
    
  }

  ngOnInit(){
    if(this.loginService.checkSession()){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

}
