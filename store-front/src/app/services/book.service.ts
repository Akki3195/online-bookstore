import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppConst } from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  serverPath: string = AppConst.serverPath;

  constructor(private http: HttpClient) { }

  getBookList(){
    let url = this.serverPath+"/book/bookList";
    let header = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : localStorage.getItem('token')
    });

    return this.http.get(url,{headers: header, responseType: 'json'});
  }

  getBook(id: number){
    let url = this.serverPath+"/book/"+id;

    let header = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.get(url,{headers: header, responseType: 'json'});
  }

  searchBook(keyword: string){
    let url = this.serverPath+"/book/searchBook";

    let header = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.post(url,keyword,{headers: header, responseType: 'json'});
  }
}
