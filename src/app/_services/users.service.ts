import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { User } from "@app/_models";
@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(manufacturerId: number) {
    return this.http.get<User[]>(
      `${environment.apiUrl}/user/getAllUsers?manufacturerId=${manufacturerId}`
    );
  }

  // getById(id: number) {
  //   return this.http.get(`${environment.apiUrl}/users/${id}`);
  // }

  // update(user: User) {
  //   return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  // }

  add(user: User, manufacturerId: number) {
    return this.http.post(
      `${environment.apiUrl}/user/addUser?manufacturerId=${manufacturerId}`,
      user
    );
  }

  // delete(id: number) {
  //   return this.http.delete(`${environment.apiUrl}/users/${id}`);
  // }
}
