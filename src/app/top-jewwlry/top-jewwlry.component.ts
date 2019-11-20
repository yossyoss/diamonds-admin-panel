import { Component, OnInit } from '@angular/core';
import { StatisticsService, UtilityService } from "@app/_services";
import { ExportAsService, ExportAsConfig } from "ngx-export-as";

@Component({
  selector: 'app-top-jewwlry',
  templateUrl: './top-jewwlry.component.html',
  styleUrls: ['./top-jewwlry.component.css']
})
export class TopJewelryComponent implements OnInit {
  id: number;
  dataForLineChart: any;
  options = {
    legend: {
      display: false
    }
  };
  // rangeDates: Date[] = [];
  from: string;
  to: string;
  videoLink: string;
  invalidDates: Array<Date>;
  constructor(
    private statisticsService: StatisticsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
  }

  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.getStatisticsByDate();
    }
  }

  private getStatisticsByDate() {
    this.statisticsService
      .getJewelryByBarcodeAndDate(
        this.id,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(data => {
        this.statisticsService
          .findJewelry(this.id)
          .subscribe(({ videoLink }) => {
            this.videoLink = videoLink;
          });
        // TODO - remove comments and remove mock
        // this.videoLink = data[0] ? data[0].jewelryDTO.videoLink : null;
        this.dataForLineChart = this.utilityService.calculateLineChart(data);
      });
  }

}
