import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from './app.routing';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PaymentService } from './services/payment.service';
import { ShippingService } from './services/shipping.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { PagerService } from './services/pager.service';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    BookListComponent,
    BookListComponent,
    BookDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [LoginService,
              UserService,
              PaymentService,
              ShippingService,
              BookService,
              PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
