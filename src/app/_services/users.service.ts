import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { User } from "@app/_models";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsersByManufacturer(manufacturerId: number) {
    return this.http.get<User[]>(
      `${environment.apiUrl}/user/getAllUsers?manufacturerId=${manufacturerId}`
    );
  }

  getUsersByStore(manufacturerId: number, storeName: string) {
    return this.http.get(
      `${
        environment.apiUrl
      }/users/getUsersByStore?manufacturerId=${manufacturerId}&storeName=${storeName}`
    );
  }
  getUsersByCity(manufacturerId: number, state: string, city: string) {
    return this.http.get(
      `${
        environment.apiUrl
      }/users/getUsersByCity?manufacturerId=${manufacturerId}&state=${state}&city=${city}`
    );
  }
  addUser(user: User, manufacturerId: number) {
    return this.http.post(
      `${environment.apiUrl}/user/addUser?manufacturerId=${manufacturerId}`,
      user
    );
  }
  deleteUser(manufacturerId: number, username: string) {
    return this.http.delete(
      `${
        environment.apiUrl
      }/users/deleteUser?username=${username}&manufacturerId=${manufacturerId}`
    );
  }

  updateUser(user: User, manufacturerId: number) {
    return this.http.put(
      `${environment.apiUrl}/user/updateUser?manufacturerId=${manufacturerId}`,
      user
    );
  }
}
