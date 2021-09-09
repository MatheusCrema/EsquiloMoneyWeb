import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Category, CategoryResult } from 'src/app/core/category/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  categoriesUrl = "https://localhost:44382/api/categories?hierarchy=0&itemsPerPage=25";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResult> {
    //    var a;
    //a =  this.http.get<CategoryResult>(this.categoriesUrl, { 'headers': httpOptions.headers });
    // a = this.http.get<CategoryResult>(this.categoriesUrl);
    // console.log("reeeeees: " + a);
    // var res = a;
    // return res;
    return this.http.get<CategoryResult>(this.categoriesUrl);

  }
}
