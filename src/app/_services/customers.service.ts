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
}
