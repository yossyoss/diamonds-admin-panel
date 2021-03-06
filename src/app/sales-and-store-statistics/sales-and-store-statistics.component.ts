import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  StatisticsService,
  UtilityService,
  AuthenticationService
} from "@app/_services";

import { MessageService } from "primeng/api";

@Component({
  templateUrl: "./sales-and-store-statistics.component.html",
  styleUrls: ["./sales-and-store-statistics.component.css"]
})
export class SalesAndStoreStatisticsComponent implements OnInit {
  data: any;
  from: string;
  to: string;
  dataForLineChart: any;
  dataForStoreVideosLineChart: any;
  salesMan: any;
  options = {
    legend: {
      display: false
    }
  };
  id: number;
  storeName: string;
  path: string;
  manufacturerId: string;
  rangeDates: Date;
  constructor(
    private utilityService: UtilityService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    console.log(this.route.snapshot.url[1].path);
    console.log(this.route.snapshot.params);
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
    this.id = this.route.snapshot.params.id;

    this.path = this.route.snapshot.url[1].path;
    if (this.path === "sales") {
      this.salesMan = this.route.snapshot.params.name;
      console.log(this.salesMan);
    } else {
      this.storeName = this.route.snapshot.params.name;
    }
  }
  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.getStatisticsByDate();
    }
  }

  private getStatisticsByDate() {
    if (this.path === "sales") {
      this.statisticsService
        .getSalesPersonVideosByDateRange(
          this.id,
          this.utilityService.convertDate(this.from),
          this.utilityService.convertDate(this.to)
        )
        .subscribe(data => {
          this.dataForLineChart = this.utilityService.calculateLineChart(data); //left side
        });
      this.statisticsService
        .getSalesPersonAllVideosGroupedByJewelry(
          this.id,
          this.utilityService.convertDate(this.from),
          this.utilityService.convertDate(this.to)
        )
        .subscribe(data => {
          console.log(data);

          // this.data = this.utilityService.calculatePieChart(data); //right side
          this.dataForStoreVideosLineChart = this.utilityService.calculateBarChart(
            data
          );
        });
    } else {
      // store scenario
      this.statisticsService
        .getStoreVideosByDate(
          this.manufacturerId,
          this.id,
          this.utilityService.convertDate(this.from),
          this.utilityService.convertDate(this.to)
        )
        .subscribe(data => {
          this.dataForLineChart = this.utilityService.calculateLineChart(data); //left side
        });
      this.statisticsService
        .getStoreVideosGroupByJewelry(
          this.manufacturerId,
          this.id,
          this.utilityService.convertDate(this.from),
          this.utilityService.convertDate(this.to)
        )
        .subscribe(data => {
          // this.data = this.utilityService.calculatePieChart(data); //right side
          this.dataForStoreVideosLineChart = this.utilityService.calculateBarChart(
            data
          );
        });
    }
  }
  useSalesMock() {
    return [
      {
        user: {
          id: 12,
          firstName: "Nadia",
          lastName: "Ben Zaken",
          username: "nadia@gmail.com",
          password: "11111",
          role: "SALES",
          store: "Tucson Premium Outlets"
        },
        jewelryDTO: {
          id: 6,
          barcode: "11111",
          additionalInfo: "Wow",
          manufacturer: 1,
          videoLink: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/11111.mp4"
        },
        day: "1/23/19",
        hour: "12",
        total: 3
      },
      {
        user: {
          id: 12,
          firstName: "Nadia",
          lastName: "Ben Zaken",
          username: "nadia@gmail.com",
          password: "11111",
          role: "SALES",
          store: "Tucson Premium Outlets"
        },
        jewelryDTO: {
          id: 7,
          barcode: "54321",
          additionalInfo: "Large ring with many diamonds",
          manufacturer: 1,
          videoLink: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4"
        },
        day: "1/24/19",
        hour: "11",
        total: 1
      },
      {
        user: {
          id: 12,
          firstName: "Nadia",
          lastName: "Ben Zaken",
          username: "nadia@gmail.com",
          password: "11111",
          role: "SALES",
          store: "Tucson Premium Outlets"
        },
        jewelryDTO: {
          id: 7,
          barcode: "54321",
          additionalInfo: "Large ring with many diamonds",
          manufacturer: 1,
          videoLink: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4"
        },
        day: "1/25/19",
        hour: "11",
        total: 15
      },
      {
        user: {
          id: 12,
          firstName: "Nadia",
          lastName: "Ben Zaken",
          username: "nadia@gmail.com",
          password: "11111",
          role: "SALES",
          store: "Tucson Premium Outlets"
        },
        jewelryDTO: {
          id: 7,
          barcode: "54321",
          additionalInfo: "Large ring with many diamonds",
          manufacturer: 1,
          videoLink: "https://s3.amazonaws.com/ttc-diamonds/Swarovsky/54321.mp4"
        },
        day: "1/26/19",
        hour: "11",
        total: 1
      }
    ];
  }
}
// To-do
// 1.adding array of colors
// 4.make it responsive by adding class
