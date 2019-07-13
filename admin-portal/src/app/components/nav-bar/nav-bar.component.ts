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
    //this.logout();
    if(this.loginService.checkSession()){
      this.loggedIn=true;
    }
    else{
      this.loggedIn=false;
    }
  }

  logout(){
    this.loginService.logout().subscribe(
      res => {
        console.log("in res method");
        console.log(res);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        location.reload();
      },  
      error => {
        console.log("in error method");
        console.log(error);
      }
        
    );
    console.log("code excuted after subscription");
    // this.router.navigate(['/']);
  }

}
