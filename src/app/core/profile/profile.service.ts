import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Account, AccountResult } from "src/app/core/account/account";
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
export class ProfileService {
  identitiesURL = environment.apiUrl + "Identities";

  constructor(private http: HttpClient) {}

  getIdentities(): Observable<any> {
    return this.http.get<any>(this.identitiesURL);
  }

  deleteIdentity(identityID: number): Observable<any> {
    var url = this.identitiesURL.concat("/", identityID.toString());
    
    console.log(">>>>>>>>>>>>> url :" + url);
    
    var resp = this.http.delete(url).pipe(
      catchError((err) => {
        console.log(">>>>>>>>>>> err: " + err);
        //Handle the error here

        return throwError(err); //Rethrow it back to component
      })
    );
    console.log(">>>>> delete service response:  " + resp);
    return resp;
  }
}
