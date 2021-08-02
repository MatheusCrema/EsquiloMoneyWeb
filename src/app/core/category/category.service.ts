import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Category, CategoryResult } from "src/app/core/category/category";
import { catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment.staging";
//import { error } from "selenium-webdriver";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    //Authorization: "my-auth-token",
  }),
};

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  categoriesURL = environment.apiUrl + "categories";
  categoriesGet = environment.apiUrl + "categories?itemsPerPage=100";

  categoryResult: CategoryResult;

  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(category);

    var resp = this.http
      .post(this.categoriesURL, body, { headers: headers })
      .pipe(
        catchError((err) => {
          console.log("error caught in service");
          console.error(err);

          //Handle the error here

          return throwError(err); //Rethrow it back to component
        })
      );

    return resp;
  }

  editCategory(category: Category): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(category);

    console.log(">>>> editCategoryService - category name: " + category.name);
    console.log(">>>> editCategoryService - category id: " + category.categoryID?.toString());

    var resp = this.http
      .patch(this.categoriesURL.concat("/", category.categoryID?.toString() ), body, { headers: headers })
      .pipe(
        catchError((err) => {
          console.log("error caught in service");
          console.error(err);

          //Handle the error here

          return throwError(err); //Rethrow it back to component
        })
      );

   console.log(">>>> editCategoryService - resp: " + resp);


    return resp;
  }


  deleteCategory(categoryID: number): Observable<any> {
    var url = this.categoriesURL.concat("/", categoryID.toString());

    console.log(">>>>>> delete URL: " + url);

    var resp = this.http.delete(url).pipe(
      catchError((err) => {
        console.log("error caught in service");
        console.error(err);

        //Handle the error here

        return throwError(err); //Rethrow it back to component
      })
    );
    console.log(">>>>> delete service response:  " + resp);
    return resp;
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesGet);
  }

  // Error Handling
  errorHandler(error) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      //Get client-side error
      errorMessage = error.error.message;
    } else {
      //Get server-side error
      errorMessage = "Error Code: ${error.status}\nMessage: ${error.message}";
    }

    console.log("><><><><><><><><><>< errorMessage:" + errorMessage);
    return throwError(errorMessage);
  }

  testCall(): Observable<any> {
    return this.http
      .get<any>("http://localhost:3000/profile")
      .pipe(retry(1), catchError(this.errorHandler));
  }
}
