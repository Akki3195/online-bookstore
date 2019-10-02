import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
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
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './services/order.service';
import { CheckoutService } from './services/checkout.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    BookListComponent,
    BookListComponent,
    BookDetailComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderSummaryComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // AppRoutingModule,
    routing

  ],
  providers: [LoginService,
              UserService,
              PaymentService,
              ShippingService,
              BookService,
              PagerService,
              CartService,
              OrderService,
              CheckoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
