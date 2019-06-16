import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private loggedIn = false;
  constructor(private loginService: LoginService,private router: Router) { }

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

  logout(){
    this.loginService.logout()
      .subscribe(
      res => {
        localStorage.clear();
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['/']);
  }
}
