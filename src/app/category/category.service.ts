import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Category } from 'src/app/category/category';
import { CATEGORIES } from 'src/app/components/mock-class/mock-class';

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
  categoriasUrl = "https://localhost:44313/api/categorias";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    //return of(CATEGORIES);
    return this.http.get<Category[]>(this.categoriasUrl)
  }
}
