import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/constants/app-const';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private dataFetched = false;
  private logginError: boolean;
  private credential = {'username':'','password':''};
  private loggedIn: boolean;
  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword: string;
  private incorrectPassword: boolean;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router
              ) { }

  onUpdateUserInfo(){
    this.userService.updateUserInfo(this.user,this.newPassword).subscribe(
      res => {
        console.log(res);
        this.updateSuccess = true;
      },
      error => {
        console.log(error);
        let errorMessage = error.text();
        if(errorMessage === "Incorrect current password")
          this.incorrectPassword = true;
      }
    );

  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(
      res => {
        
        this.user = JSON.parse(JSON.stringify(res));
        this.dataFetched = true;

      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    if(this.loginService.checkSession()){
      this.loggedIn = true;
    }else{
    this.loggedIn = false;
    console.log("inactive session");
    this.router.navigate(['/myAccount']);
    }
  
    this.getCurrentUser();
  }

}