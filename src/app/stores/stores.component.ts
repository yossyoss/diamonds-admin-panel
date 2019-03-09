import { Component, OnInit, ViewChild } from "@angular/core";

import { StatisticsService, UtilityService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";
import { log } from "util";

@Component({
  selector: "stores",
  templateUrl: "./stores.component.html",
  styleUrls: ["./stores.component.css"]
})
export class StoresComponent implements OnInit {
  displayedColumns: string[] = [
    "storename",
    "storecity",
    "storestate",
    "total"
  ];
  dataSource: any = new MatTableDataSource();
  from: string;
  to: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statisticsService: StatisticsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    console.log(this.dataSource.data);

    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.loadAllStores();
      console.log(this.sort);
    }
  }
  private loadAllStores() {
    this.statisticsService
      .getAllStoresVideos(
        1,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(list => {
        list.forEach(e => {
          //making this shit do to sorting problem of matirial tables
          if (e.store) {
            e.storename = e.store.name;
            e.storecity = e.store.city;
            e.storestate = e.store.state;
          }
        });
        this.dataSource.data = list;
        this.dataSource.sort = this.sort;
      });
  }
}
