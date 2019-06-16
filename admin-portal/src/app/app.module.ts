import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './service/login.service';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { AddBookService } from './service/add-book.service';
import { UploadImageService } from './service/upload-image.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { GetBookListService } from './service/get-book-list.service';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { GetBookService } from './service/get-book.service';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { EditBookService } from './service/edit-book.service';
import { RemoveBookService } from './service/remove-book.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AddNewBookComponent,
    BookListComponent,
    ViewBookComponent,
    EditBookComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    routing,
  ],
  providers: [
        LoginService,
        AddBookService,
        UploadImageService,
        GetBookListService,
        GetBookService,
        EditBookService,
        RemoveBookService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
