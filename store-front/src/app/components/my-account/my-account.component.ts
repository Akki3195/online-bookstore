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
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage === "usernameExists")
         this.userNameExists = true;
        if(errorMessage === "emailExists")
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
        this.emailSent = true;
      },
      error => {
        console.log(error.text());
        let errorMessage = error.text();
        if(errorMessage === "emailExists")
         this.emailExists = true;
      }
    );
  }

  onLogin() {
    this.loginService.sendCredential(this.credential.username,this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("xAuthToken","pending");
        this.loggedIn= true;
        location.reload();
        this.router.navigate(['/home'])
      },
      error => {
        this.loggedIn = false;
        this.loginError = true;

      }
    );
    
  }

  ngOnInit(){
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;
      }
    );
  }

}
