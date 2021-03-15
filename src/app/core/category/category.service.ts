import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Category, CategoryResult } from 'src/app/core/category/category';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesURL = "https://localhost:44313/api/categories";

  categoriesGet = "https://localhost:44313/api/categories?itemsPerPage=100";


  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResult> {

    return this.http.get<CategoryResult>(this.categoriesGet)
  }

  addCategory(category: Category): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(category);
    console.log("body " + body)

    var resp =  this.http.post(this.categoriesURL, body, { 'headers': headers })
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);

        //Handle the error here

        return throwError(err);    //Rethrow it back to component
      })
    ); 
    
    console.log("response >>> " + resp)

    return resp;
  }

}
