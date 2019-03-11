import { Component, OnInit, ViewChild } from "@angular/core";

import { StatisticsService, UtilityService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";
import { ngxCsv } from "ngx-csv/ngx-csv";

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
  dataToExport: any[] = [];
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
            let dataToExport = {
              storename: e.storename,
              storecity: e.storecity,
              storestate: e.storestate,
              total: e.total
            };
            this.dataToExport.push(dataToExport);
          }
        });
        this.dataSource.data = list;
        this.dataSource.sort = this.sort;
      });
  }
  exportCsv() {
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Stores",
      useBom: true,
      noDownload: false,
      headers: ["Store Name", "City", "State", "Total"]
    };
    new ngxCsv(this.dataToExport, "Customers Report", options);
  }
}
