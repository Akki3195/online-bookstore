import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { GetBookListService } from 'src/app/service/get-book-list.service';
import { GetBookService } from 'src/app/service/get-book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  private book = new Book();
  private bookId: number;

  constructor(private getBookService: GetBookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.bookId = +(params['id']);  
      }
    );

    this.getBookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelect(book: Book)
  {
    this.router.navigate(['/editBook',this.book.id]);

  }
}
