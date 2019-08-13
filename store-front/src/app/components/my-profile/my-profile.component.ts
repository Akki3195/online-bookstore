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
import { UserShipping } from 'src/app/models/user-shipping';
import { ShippingService } from 'src/app/services/shipping.service';

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

  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] =  [];
  private defaultPaymentSet: boolean;
  private defaultUserPaymentId: number;
  private stateList: string[] = [];
  private newPaymentAdded: boolean = false;
  private newShippingAdded: boolean = false;
  private var: boolean = true;

  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[] = [];

  private defaultUserShippingId: number;
  private defaultShippingSet: boolean;

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private paymentService: PaymentService,
              private shippingService: ShippingService
              ) { }

  onUpdateUserInfo(){
    this.userService.updateUserInfo(this.user,this.newPassword,this.currentPassword).subscribe(
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

  onNewPayment(){
    this.userPayment.userBilling = this.userBilling;
    console.log("from new Paymetn"+this.userPayment.userBilling);
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.newPaymentAdded = true;
        this.userPayment = new UserPayment();
      },
      error => {
        console.log(error);
        this.newPaymentAdded = false;
      }
    );
  }

  onEditPayment(payment: UserPayment){
    console.log(payment);
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
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

  resetInfo(resetChar: string){
    if(resetChar === 'P'){
    this.userPayment = new UserPayment();
    this.userBilling = new UserBilling();
    this.newPaymentAdded = false;
    }
    if(resetChar === 'S'){
      this.userShipping = new UserShipping();
      this.newShippingAdded = false;
    }
  }

  setDefaultPayment(){
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  onNewShipping(){
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.userShipping = new UserShipping();
        this.newShippingAdded = true;
      },
      error => {
        console.log(error.text());
        this.newShippingAdded = false;
      }
    );
  }

  onUpdateShipping(shipping: UserShipping){
    this.userShipping = shipping;
  }

  onRemoveShipping(id: number){
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      error => {
        console.log(error.text());
      }
    );
  }

  setDefaultShipping(){
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
      },
      error => {
        console.log(error.text());
      }
    );
  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = JSON.parse(JSON.stringify(res));
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for (let index in this.userPaymentList) {
  				if(this.userPaymentList[index].defaultPayment) {
  					this.defaultUserPaymentId=this.userPaymentList[index].id;
  					break;
  				}
        }
        
        for (let index in this.userShippingList) {
  				if(this.userShippingList[index].userShippingDefault) {
  					this.defaultUserShippingId=this.userShippingList[index].id;
  					break;
  				}
  			}
        this.dataFetched = true;
      },
      err => {
        
        if(JSON.parse(JSON.stringify(err)).error.message== "Unauthorized"){
          localStorage.clear();
          location.reload();
        }
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

    for(let s in AppConst.states){
      this.stateList.push(s);
    }
    this.userBilling.userBillingState = "";
    this.userPayment.type = "";
    this.userPayment.expiryMonth="";
    this.userPayment.expiryYear="";
    this.userPayment.userBilling= this.userBilling;
    this.defaultPaymentSet=false;
    this.newPaymentAdded = false; 
    this.newShippingAdded = false;

    this.userShipping.userShippingState="";
    this.defaultShippingSet=false;
  }


}