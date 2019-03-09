import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  // ****************
  // Sales person API
  // ****************

  getSalesPersonAllVideosGroupedByJewelry(
    userId: number,
    from: string,
    to: string
  ) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getSalesPersonAllVideosGroupedByJewelry?userId=${userId}&from=${from}&to=${to}`
    );
  }

  getSalesPersonAllVideos(userId: number) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getSalesPersonAllVideos?userId=${userId}`
    );
  }

  getSalesPersonVideosByDateRange(userId: number, from: string, to: string) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getSalesPersonVideosByDateRange?userId=${userId}&from=${from}&to=${to}`
    );
  }
  // ****************
  // Stores API
  // ****************
  getAllStoresVideos(manufacturerId: number, from: string, to: string): any {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getAllStoresVideos?manufacturerId=${manufacturerId}&from=${from}&to=${to}`
    );
  }

  getStoreVideosByDate(
    manufacturerId: number,
    storeId: number,
    from: string,
    to: string
  ) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getStoreVideosByDate?manufacturerId=${manufacturerId}&storeId=${storeId}&from=${from}&to=${to}`
    );
  }
  getStoreVideosGroupByJewelry(
    manufacturerId: number,
    storeId: number,
    from: string,
    to: string
  ) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getStoreVideosGroupByJewelry?manufacturerId=${manufacturerId}&storeId=${storeId}&from=${from}&to=${to}`
    );
  }

  // ****************
  // Jewelry API
  // ****************
  getJewelryByBarcodeAndDate(barcode: number, from: string, to: string) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getJewelryByBarcodeAndDate?barcode=${barcode}&from=${from}&to=${to}`
    );
  }

  getJewelryByDate(userId: number, from: string, to: string) {
    return this.http.get(
      `${
        environment.apiUrl
      }/statistics/getJewelryByDate?userId=${userId}&from=${from}&to=${to}`
    );
  }

  findJewelry(barcode: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/diamonds/findJewelry?barcode=${barcode}`
    );
  }
}
