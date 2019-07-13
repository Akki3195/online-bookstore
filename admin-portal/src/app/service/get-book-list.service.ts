import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Http,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class GetBookListService {

  constructor(private http:Http) { }

  getBookList(){
    let url = "http://localhost:8181/book/bookList";
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization' : localStorage.getItem('token')
    });
    return this.http.get(url,{headers: headers});
  }
}
