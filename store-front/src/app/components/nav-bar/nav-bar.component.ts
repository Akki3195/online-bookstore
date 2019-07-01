import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private loggedIn = false;

  constructor(private loginService: LoginService) { }

  logout(){
    this.loginService.logout().subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('xAuthToken');
        location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
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
