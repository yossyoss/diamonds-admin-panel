import { Component, OnInit, ViewChild } from "@angular/core";

import {
  StatisticsService,
  UtilityService,
  AuthenticationService
} from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";
import { ngxCsv } from "ngx-csv/ngx-csv";
import { Router } from "@angular/router";

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
  storeToId = {};
  dataForLineChart: any;
  dataSource: any = new MatTableDataSource();
  from: string;
  to: string;
  manufacturerId: string;
  options = {
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    },
    label: {
      display: false
    }
  };
  dataToExport: any[] = [];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statisticsService: StatisticsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    console.log(this.dataSource.data);
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
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

  selectData(event) {
    const index = event.element._index;
    const label = this.dataForLineChart.labels[index];
    const id = this.storeToId[label];
    if (label !== "None")
      this.router.navigate([`/statistics/stores/${id}/name`, label]);
  }

  private loadAllStores() {
    this.statisticsService
      .getAllStoresVideos(
        this.manufacturerId,
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
            this.storeToId[e.store.name] = e.store.id;
            this.dataToExport.push(dataToExport);
          }
        });
        this.dataForLineChart = this.utilityService.calculateStoresBarChart(
          list
        );

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
