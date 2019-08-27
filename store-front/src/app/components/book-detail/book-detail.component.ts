import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AppConst } from 'src/app/constants/app-const';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  
  private bookId: number;
  private book: Book = new Book();
  private serverPath = AppConst.serverPath;
  private numberList: number[] = [1,2,3,4,5,6,7,8,9];
  private qty: number;

  private addBookSuccess: boolean = false;
  private notEnoughStock: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  onAddToCart(){

  }


  ngOnInit() {
    this.route.params.forEach((params: HttpParams) => {
      this.bookId = Number.parseInt(params['id']);
    });

    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res as Book;
        if(this.book.inStockNumber <= 10){
          this.numberList = Array.from(Array(this.book.inStockNumber).keys());
        }
      },
      error => {
        console.log(error)
      }
    );

    this.qty = 1;
  }

}
