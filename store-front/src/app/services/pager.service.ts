import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  getPager(totalItems: number,currentPage: number){
    let pageSize: number=10;
    //calculate total number of page
    let totalPages = Math.ceil(totalItems/pageSize);

    //ensure current page isn't out of range
    if(currentPage < 1){
      currentPage = 1
    }else if(currentPage > totalPages){
      currentPage = totalPages;
    }

    //logic for start and end page
    let startPage: number,endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    //calculate start Index and End Index from all Items
    let startIndex = (currentPage -1) * pageSize;
    let endIndex = Math.min((startIndex + pageSize - 1),(totalItems - 1));

    //creating array of pages to ng-repeat in a pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage+i);

    // returning object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
