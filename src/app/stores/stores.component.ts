import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";

// import { TableModule } from "primeng/table";
import { Customer } from "@app/_models";
import { CustomersService, StatisticsService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";

const ELEMENT_DATA = [
  {
    store: {
      id: 10,
      name: "Concord Mills",
      city: "Concord",
      state: "North Carolina"
    },
    day: "2/16/19",
    total: 7,
    jewelryDTO: null
  },
  {
    store: {
      id: 13,
      name: "Park Place",
      city: "Tucson",
      state: "Arizona"
    },
    day: "2/18/19",
    total: 2,
    jewelryDTO: null
  }
];

@Component({
  selector: "stores",
  templateUrl: "./stores.component.html",
  styleUrls: ["./stores.component.css"]
})
export class StoresComponent implements OnInit {
  displayedColumns: string[] = ["name", "city", "state", "total"];
  dataSource: any = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.loadAllStores();
    this.dataSource.sort = this.sort;
    // this.dataSource = this.users;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  do(e) {
    console.log(e);
  }
  private loadAllStores() {
    this.statisticsService
      .getAllStoresVideos(1, "2019-01-01", "2019-02-20")
      .subscribe(users => {
        // this.dataSource = users;
      });
    this.dataSource = ELEMENT_DATA; //users;
  }
}
