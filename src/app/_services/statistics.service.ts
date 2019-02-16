import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }
  
  // Sales person apis
  getSalesPersonDataById(id: number) {
    return this.http.get(`${environment.apiUrl}/statistics/getSalesPersonAllVideos/userId=${id}`);
  }

 
  getSalesPersonDataByDateRange(id: number,from:string,to:string) {
    return this.http.get(`${environment.apiUrl}/statistics/getSalesPersonVideosByDateRange/userId=${id}&from=${from}&to=${to}`);
  }

  //Jewelry apis
  getJewelryDataByDateRange(id: number,from:string,to:string) {
    return this.http.get(`${environment.apiUrl}/statistics/getJewelryByDate/userId=${id}&from=${from}&to=${to}`);
  }
}
