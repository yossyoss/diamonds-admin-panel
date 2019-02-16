import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatisticsService } from "@app/_services";
@Component({
  templateUrl: "./sales-statistics.component.html",
  styleUrls: ["./sales-statistics.component.css"]
})
export class SalesStatisticsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}
  id: number;
  data: any = [
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
    }
  ];
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.statisticsService.getSalesPersonDataById(this.id).subscribe(data => {
      this.data = data;
    });
    console.log(this.data);
  }
}
