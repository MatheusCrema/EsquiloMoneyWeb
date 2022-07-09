import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Category, CategoryResult } from "src/app/core/category/category";
import { catchError, map, pluck, retry } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment.staging";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    //Authorization: "my-auth-token",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  itemsPerPage = 50;
  transactionsURLBase = environment.apiUrl + "transactions" + "?ItemsPerPage=" + this.itemsPerPage;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get<any>(this.transactionsURLBase);
  }
}
