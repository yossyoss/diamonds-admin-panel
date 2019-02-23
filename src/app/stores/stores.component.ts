import { Component, OnInit, ViewChild } from "@angular/core";

import { StatisticsService, UtilityService } from "@app/_services";

import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "stores",
  templateUrl: "./stores.component.html",
  styleUrls: ["./stores.component.css"]
})
export class StoresComponent implements OnInit {
  displayedColumns: string[] = ["name", "city", "state", "total"];
  dataSource: any = new MatTableDataSource();
  from: string;
  to: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private statisticsService: StatisticsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
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
        this.dataSource = list;
      });
  }
}
