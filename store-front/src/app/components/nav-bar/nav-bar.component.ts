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

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        console.log("from Success"+res);
        this.loggedIn = true;
      },
      error => {
        console.log("from Error"+error);
        this.loggedIn = false;
      }
    );
  }

}
