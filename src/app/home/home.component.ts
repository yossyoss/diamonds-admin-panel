import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
// import { TableModule } from "primeng/table";
import { Customer } from "@app/_models";
import { CustomersService, AuthenticationService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
    "date",
    "storeName",
    "barcode",
    "sales_person_name"
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.loadAllCustomers();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private loadAllCustomers() {
    this.customersService.getAll().subscribe(users => {
      users.forEach(e => {
        //making this shit do to sorting problem of matirial tables
        e.sales_person_name =
          e.sales_person.firstName + " " + e.sales_person.lastName;
        e.storeName = e.sales_person.store;
      });
      this.dataSource.data = users;
      this.dataSource.sort = this.sort;
    });
    // this.dataSource.data = [
    //   {
    //     name: "Tal",
    //     email: "tlusa18@gmail.com",
    //     date: "2019-01-31",
    //     phone: "+1983746555",
    //     barcode: "11111",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    //     sales_person: {
    //       id: 10,
    //       firstName: "uri",
    //       lastName: "the tall",
    //       username: "uri@gnail.com",
    //       password: "12345",
    //       role: "SALES",
    //       store: "Concord Mills"
    //     },
    //     sales_person_name: "uri"
    //   },
    //   {
    //     name: "Moshe Zar",
    //     email: "mosh@gmail.com",
    //     date: "2019-01-02",
    //     phone: "+1983746555",
    //     barcode: "11111",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    //     sales_person: {
    //       id: 12,
    //       firstName: "Nadia",
    //       lastName: "Ben Zaken",
    //       username: "nadia@gmail.com",
    //       password: "11111",
    //       role: "SALES",
    //       store: "Tucson Premium Outlets"
    //     },
    //     sales_person_name: "Nadia"
    //   },
    //   {
    //     name: "yariv",
    //     email: "yariv@gmail.com",
    //     date: "2019-02-31",
    //     phone: "+1983746444",
    //     barcode: "11111",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    //     sales_person: {
    //       id: 12,
    //       firstName: "Nadia",
    //       lastName: "Ben Zaken",
    //       username: "nadia@gmail.com",
    //       password: "11111",
    //       role: "SALES",
    //       store: "Tucson Premium Outlets"
    //     },
    //     sales_person_name: "Jon"
    //   },
    //   {
    //     name: "Dana International",
    //     email: "dana.int@gmail.com",
    //     date: "2019-01-29",
    //     phone: "+1983746333",
    //     barcode: "54321",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
    //     sales_person: {
    //       id: 11,
    //       firstName: "Yosi",
    //       lastName: "the dos",
    //       username: "yosi@gmail.com",
    //       password: "123123",
    //       role: "SALES",
    //       store: "Concord Mills"
    //     },
    //     sales_person_name: "Yosi"
    //   },
    //   {
    //     name: "Moshik Rot",
    //     email: "mo.shik@gmail.com",
    //     phone: "+1983746222",
    //     date: "2019-01-17",
    //     barcode: "54321",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
    //     sales_person: {
    //       id: 12,
    //       firstName: "Nadia",
    //       lastName: "Ben Zaken",
    //       username: "nadia@gmail.com",
    //       password: "11111",
    //       role: "SALES",
    //       store: "Tucson Premium Outlets"
    //     },
    //     sales_person_name: "Ben"
    //   },
    //   {
    //     name: "Shmulik Kippod",
    //     email: "shmullik@gmail.com",
    //     phone: "+1983746111",
    //     date: "2019-01-05",
    //     barcode: "11111",
    //     videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    //     sales_person: {
    //       id: 12,
    //       firstName: "Nadia",
    //       lastName: "Ben Zaken",
    //       username: "nadia@gmail.com",
    //       password: "11111",
    //       role: "SALES",
    //       store: "Tucson Premium Outlets"
    //     },
    //     sales_person_name: "Zaken"
    //   }
    // ];
  }
}
