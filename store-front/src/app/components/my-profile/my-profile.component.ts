import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/constants/app-const';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { UserPayment } from 'src/app/models/user-payment';
import { UserBilling } from 'src/app/models/user-billing';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private dataFetched = false;
  private logginError: boolean;
  private credential = {'username':'','password':''};
  private loggedIn: boolean;

  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword: string;
  private incorrectPassword: boolean;
  private currentPassword: string;

  private selectProfileTab: number = 0;
  private selectedBillingTab: number = 0;

  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  //private userPaymentList: UserPayment = new UserPayment[] = [];
  private defaultPaymentSet: boolean;
  private defaultPaymentId: number;
  private stateList : string[] = [];

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private paymentService: PaymentService
              ) { }

  selectedBillingChange(val: number){
    this.selectProfileTab = val;
  }

  onUpdateUserInfo(){
    this.userService.updateUserInfo(this.user,this.newPassword).subscribe(
      res => {
        console.log(res);
        this.updateSuccess = true;
      },
      error => {
        console.log(error);
        let errorMessage = error.text();
        if(errorMessage === "Incorrect current password")
          this.incorrectPassword = true;
      }
    );

  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = JSON.parse(JSON.stringify(res));
        console.log(this.user);
        this.dataFetched = true;
      },
      err => {
        console.log(err);
        if(JSON.parse(JSON.stringify(err)).error.message== "Unauthorized"){
          localStorage.clear();
          location.reload();
        }
      }
    );
  }

  onNewPayment(){
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onUpdatePayment(payment: UserPayment){
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id:number){
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setDefaultPayment(){
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  ngOnInit() {
    if(this.loginService.checkSession()){
      this.loggedIn = true;
    }else{
    this.loggedIn = false;
    console.log("inactive session");
    this.router.navigate(['/myAccount']);
    }
  
    this.getCurrentUser();

    for(let s in AppConst.usStates){
      this.stateList.push(s);
    }
    this.userBilling.userBillingState = "";
    this.userPayment.type = "";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling= this.userBilling;
    this.defaultPaymentSet=false;
  }


}