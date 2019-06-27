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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [LoginService,
              UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
