import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatisticsService, UtilityService } from "@app/_services";
import { log } from "util";
@Component({
  templateUrl: "./jewellery-statistics.component.html",
  styleUrls: ["./jewellery-statistics.component.css"]
})
export class JewelleryStatisticsComponent implements OnInit {
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
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.useMock();
  }
  useMock() {
    const data = [
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

    this.videoLink = data[0] ? data[0].jewelryDTO.videoLink : null;
    this.dataForLineChart = this.utilityService.calculateLineChart(data);
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
        // TODO - remove comments and remove mock
        // this.videoLink = data[0] ? data[0].jewelryDTO.videoLink : null;
        // this.dataForLineChart = this.calculateLineChart(data);
      });
  }
}
