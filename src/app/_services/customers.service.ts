import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@environments/environment";
import { Customer } from "@app/_models";

@Injectable({ providedIn: "root" })
export class CustomersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Customer[]>(
      `${
        environment.apiUrl
      }/external/getCustomersByManufacturer?manufacturerId=1`
    );
  }

  // getById(id: number) {
  //   return this.http.get(`${environment.apiUrl}/users/${id}`);
  // }

  // register(user: User) {
  //     return this.http.post(`${environment.apiUrl}/users/register`, user);
  // }

  // update(user: User) {
  //   return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  // }

  // delete(id: number) {
  //   return this.http.delete(`${environment.apiUrl}/users/${id}`);
  // }
}
