import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
// import { TableModule } from "primeng/table";
import { Customer } from "@app/_models";
import { CustomersService, AuthenticationService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";

const ELEMENT_DATA = [
  {
    name: "Tal",
    email: "tlusa18@gmail.com",
    phone: "+1983746543",
    barcode: "11111",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    sales_person: {
      id: 10,
      firstName: "uri",
      lastName: "the tall",
      username: "uri@gnail.com",
      password: "12345",
      role: "SALES",
      store: "Concord Mills"
    }
  },
  {
    name: "Moshe Zar",
    email: "mosh@gmail.com",
    phone: "+1983746543",
    barcode: "11111",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    sales_person: {
      id: 12,
      firstName: "Nadia",
      lastName: "Ben Zaken",
      username: "nadia@gmail.com",
      password: "11111",
      role: "SALES",
      store: "Tucson Premium Outlets"
    }
  },
  {
    name: "yariv",
    email: "yariv@gmail.com",
    phone: "+1983746543",
    barcode: "11111",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    sales_person: {
      id: 12,
      firstName: "Nadia",
      lastName: "Ben Zaken",
      username: "nadia@gmail.com",
      password: "11111",
      role: "SALES",
      store: "Tucson Premium Outlets"
    }
  },
  {
    name: "Dana International",
    email: "dana.int@gmail.com",
    phone: "+1983746543",
    barcode: "54321",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
    sales_person: {
      id: 11,
      firstName: "Yosi",
      lastName: "the dos",
      username: "yosi@gmail.com",
      password: "123123",
      role: "SALES",
      store: "Concord Mills"
    }
  },
  {
    name: "Moshik Rot",
    email: "mo.shik@gmail.com",
    phone: "+1983746543",
    barcode: "54321",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4",
    sales_person: {
      id: 12,
      firstName: "Nadia",
      lastName: "Ben Zaken",
      username: "nadia@gmail.com",
      password: "11111",
      role: "SALES",
      store: "Tucson Premium Outlets"
    }
  },
  {
    name: "Shmulik Kippod",
    email: "shmullik@gmail.com",
    phone: "+1983746543",
    barcode: "11111",
    videoUrl: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4",
    sales_person: {
      id: 12,
      firstName: "Nadia",
      lastName: "Ben Zaken",
      username: "nadia@gmail.com",
      password: "11111",
      role: "SALES",
      store: "Tucson Premium Outlets"
    }
  }
];
@Component({
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
    "date",
    "store",
    "barcode",
    "sales_person"
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.loadAllCustomers();
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {}

  private loadAllCustomers() {
    this.customersService.getAll().subscribe(users => {
      this.dataSource = users;
    });
  }
}
