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
  private emailExists: string;
  private username: string;
  private email: string;

  private emailNotExists: boolean= false;
  private forgetPasswordEmailSent: boolean;

  constructor(private loginService: LoginService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginService.sendCredential(this.credential.username,this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("xAuthToken",res.json().token);
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

}
