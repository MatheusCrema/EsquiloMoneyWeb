import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Category, CategoryResult } from 'src/app/core/category/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesUrl = "https://localhost:44313/api/categories";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResult> {

    return this.http.get<CategoryResult>(this.categoriesUrl)
  }
}