import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { GetBookListService } from 'src/app/service/get-book-list.service';
import { Router } from '@angular/router';
import { RemoveBookService } from 'src/app/service/remove-book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private selectedBook: Book;
  private checked: boolean;
  private bookList: Book[];
  private allChecked: boolean;
  private removeBookList: Book[] = new Array();
  private display='none'; //default variable
  private mulitple: boolean;


  constructor(
    private getBookListService: GetBookListService,
    private router: Router,
    private removeBookService: RemoveBookService
  ) { }

  onSelect(book:Book){
    this.selectedBook=book;
    this.router.navigate(['/viewBook',this.selectedBook.id]);
  }

  ngOnInit() {
   this.getBookList();
  }

  getBookList(){
    this.getBookListService.getBookList().subscribe(
      res => {
        console.log(res.json());
        this.bookList=res.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(book:Book,mulitple: boolean){
    this.mulitple = mulitple;
    this.selectedBook=book;
    this.display='block'; //Set block css
  }

  closeDialog(){
    this.display='none'; //this is the css after close
  }

  confirmDelete(){

    if(!this.mulitple){
    this.removeBookService.sendBook(this.selectedBook.id).subscribe(
      res => {
        this.display='none';
        this.getBookList();
      },
      err => {
        console.log(err);
      }
    );
    }else{
      for(let book of this.removeBookList){
        this.removeBookService.sendBook(book.id).subscribe(
          res => {
            console.log("all books deleted.");
          },
          err => {
            console.log(err);
          }
        );
      }
    this.display='none';
    location.reload();
    }
  }

  removeSelectedBooks(){
    this.openDialog(null,true);

  }

  updateRemoveBookList(checked: boolean ,book: Book){
    if(checked){
      this.removeBookList.push(book);
    }
    else{
      this.removeBookList.splice(this.removeBookList.indexOf(book),1);
    }
  }

  updateSelected(checked: boolean){
    if(checked){
      this.allChecked = true;
      this.removeBookList = this.bookList.slice();
    }
    else{
      this.allChecked=false;
      this.removeBookList=[];
    }
  }
}

