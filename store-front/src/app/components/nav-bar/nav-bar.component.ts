import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Book } from 'src/app/models/book';
import { NavigationExtras, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private loggedIn = false;
  private keyword: string;
  private bookList : Book[] = [];

  constructor(private loginService: LoginService,private router: Router,private bookService: BookService) { }

  logout(){
    this.loginService.logout().subscribe(
      res => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearchByTitle(){
    this.bookService.searchBook(this.keyword).subscribe(
      res => {
        this.bookList = res as Book[];
        console.log(this.bookList.length);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            "bookList" : JSON.stringify(this.bookList)
          }
        };

        this.router.navigate(['/bookList'],navigationExtras)
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
      }
    }
}
