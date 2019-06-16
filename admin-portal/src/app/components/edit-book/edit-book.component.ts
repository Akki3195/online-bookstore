import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Http, Headers } from '@angular/http';
import { UploadImageService } from 'src/app/service/upload-image.service';
import { EditBookService } from 'src/app/service/edit-book.service';
import { GetBookService } from 'src/app/service/get-book.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['../add-new-book/add-new-book.component.css']
})
export class EditBookComponent implements OnInit {
  private bookId: number;
  private book = new Book();
  private bookUpdated: boolean;
  @ViewChild('f') bookDetail: NgForm;

  constructor(
      private uploadImageService: UploadImageService,
      private editBookService: EditBookService,
      private getBookService: GetBookService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  onSubmit(){
    this.editBookService.sendBook(this.book).subscribe(
      data => {
        this.uploadImageService.modify(JSON.parse(JSON.parse(JSON.stringify(data))._body).id);
        this.bookUpdated = true;
      },
      error => {
        console.log(error);
      });
  }

  onCancel(){
    this.router.navigate(['/bookList'])
  }

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
      });
  }


  

}
