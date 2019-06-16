import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../models/book'
import { NgForm } from '@angular/forms';
import { AddBookService } from 'src/app/service/add-book.service';
import { UploadImageService } from 'src/app/service/upload-image.service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook : Book = new Book();
  private bookAdded: boolean;
  @ViewChild('f') bookDetail: NgForm;

  constructor(private addBookService: AddBookService,
              private uploadImageService: UploadImageService) {
   }

  onSubmit(form: NgForm){
    this.addBookService.sendBook(form.value).subscribe(
      res => {
        this.uploadImageService.upload(JSON.parse(JSON.parse(JSON.stringify(res))._body).id);
        this.bookAdded = true;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.bookAdded = false;
    this.newBook.category = "Management";
    this.newBook.active=true;
    this.newBook.language="English";
    this.newBook.format="paperback";
   }

   

}
