import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  StatisticsService,
  UtilityService,
  AuthenticationService
} from "@app/_services";
import { ExportAsService, ExportAsConfig } from "ngx-export-as";
@Component({
  templateUrl: "./jewellery-statistics.component.html",
  styleUrls: ["./jewellery-statistics.component.css"]
})
export class JewelleryStatisticsComponent implements OnInit {
  exportAsConfig: ExportAsConfig = {
    type: "png", // the type you want to download
    elementId: "myTableElementId" // the id of html/table element
  };
  id: number;
  dataForLineChart: any;
  dataForBarChart: any;
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
  manufacturerId: string;
  constructor(
    private exportAsService: ExportAsService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService,
    private authenticationService: AuthenticationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
    // this.useMock();
  }

  export() {
    const exportAsConfig: ExportAsConfig = {
      type: "pdf", // the type you want to download
      elementId: "myTableIdElementId", // the id of html/table element,
      options: {
        // html-docx-js document options
        orientation: "portrait"
      }
    };
    // download the file using old school javascript method
    this.exportAsService.save(exportAsConfig, "My File Name");
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
        this.statisticsService
          .findJewelry(this.id)
          .subscribe(({ videoLink, id }) => {
            this.videoLink = videoLink;
            this.getJewelryCountPerStore(id);
          });
        // TODO - remove comments and remove mock
        // this.videoLink = data[0] ? data[0].jewelryDTO.videoLink : null;
        this.dataForLineChart = this.utilityService.calculateLineChart(data);
      });
  }

  private getJewelryCountPerStore(id) {
    this.statisticsService
      .getJewelryCountPerStore(
        this.manufacturerId,
        id,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(data => {
        // TODO - remove comments and remove mock
        // this.videoLink = data[0] ? data[0].jewelryDTO.videoLink : null;
        if (data && data.length) {
          this.dataForBarChart = this.utilityService.calculateBarChart(data);
        }
      });
  }
}
