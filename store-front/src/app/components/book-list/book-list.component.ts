import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AppConst } from 'src/app/constants/app-const';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private filterQuery = "";
  private  rowsOnPage: number = 10;

  private selectedBook: Book;
  private bookList: Book[];
  private serverPath = AppConst.serverPath;

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems:Book [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['bookList']) {
        console.log("filtered book list");
        this.bookList = JSON.parse(params['bookList']);
        this.setPage(1);
      }
      else {
        this.bookService.getBookList().subscribe(
          res => {
            console.log(res);
            this.bookList = res as Book[];
            this.setPage(1);
          },
          err => {
            console.log(err);
          }
        )
      }
    }

    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.bookList.length, page, this.rowsOnPage);

    // get items for current page
    this.pagedItems = this.bookList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
