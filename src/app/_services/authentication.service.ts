﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import { environment } from "@environments/environment";
import { Customer } from "@app/_models";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Customer>;
  public currentUser: Observable<Customer>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Customer>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/login?username=${username}&password=${password}`,
        {}
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            const decodedToken = jwt_decode(user.token);
            user.manufacturerId = decodedToken.jti;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
