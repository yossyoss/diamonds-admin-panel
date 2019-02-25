import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class StoresService {
  constructor(private http: HttpClient) {}

  getStoresByState(manufacturerId, state) {
    return this.http.get(
      `${
        environment.apiUrl
      }/external/getStoresByState?manufacturer=${manufacturerId}&state=${state}`
    );
  }
  getAllStates() {
    return this.http.get(`${environment.apiUrl}/external/getAllStates`);
  }
}
