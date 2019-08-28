import { Component, OnInit } from '@angular/core';
import { AppConst } from 'src/app/constants/app-const';
import { Book } from 'src/app/models/book';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shopppingCart: ShoppingCart = new ShoppingCart();
  private emptyCart: boolean;
  private notEnoughStock: boolean;
  private cartItemUpdate: boolean;

  constructor(
    private router: Router,
    private cartServices: CartService,
  ) { }
  
  onSelect(book:Book){
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  } 
  
  onRemoveCartItem(cartItem: CartItem){
    this.cartServices.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res);
        this.getCartItemList();
        this.getShoppingCart();
      },
      err => {
        console.log(err);
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem){
    this.cartServices.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res);
        this.cartItemUpdate = true;
        this.getShoppingCart();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCartItemList(){
    this.cartServices.getCartItemList().subscribe(
      res => {
        this.cartItemList = res as CartItem[];
        this.cartItemNumber = this.cartItemList.length;
      },
      err => {
        console.log(err);
      }
    );
  }

  getShoppingCart(){
    this.cartServices.getShoppingCart().subscribe(
      res => {
        console.log(res);
        this.shopppingCart = res as ShoppingCart;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCheckout(){
    if(this.cartItemNumber == 0){
      this.emptyCart = true;
    }
    else{
      for(let item of this.cartItemList){
        if(item.qty > item.book.inStockNumber){
          console.log("Not Enough stock on some item");
          this.notEnoughStock = true;
          return;
        }
      }
      //this.router.navigate(['/order'])
    }
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

}
