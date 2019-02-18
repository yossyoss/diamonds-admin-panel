import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatisticsService } from "@app/_services";
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
  rangeDates: Date[] = [];
  videoLink: string;
  invalidDates: Array<Date>;
  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.setPrevMonth();
    this.id = this.route.snapshot.params.id;
    this.getStatisticsByDate();
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
    this.dataForLineChart = this.calculateLineChart(data);
  }

  calculateBarChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: "Videos sent: ",
          data: [],
          fill: true,
          backgroundColor: "#9CCC65",
          borderColor: "#7CB342"
        }
      ],
      options: {
        label: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              console.log(tooltipItem);
              return tooltipItem.yLabel;
            }
          }
        }
      }
    };
    data.forEach(user => {
      if (newObj[user.day]) {
        newObj[user.day] += user.total;
      } else {
        newObj[user.day] = user.total;
      }
    });
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
      }
    }
    return primengObj;
  }
  calculateLineChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: "Videos sent: ",
          data: [],
          fill: true,
          borderColor: "#4bc0c0"
        }
      ]
    };
    data.forEach(user => {
      if (newObj[user.day]) {
        newObj[user.day] += user.total;
      } else {
        newObj[user.day] = user.total;
      }
    });
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
      }
    }
    return primengObj;
  }

  onClose(event: Event) {
    this.getStatisticsByDate();
  }
  setPrevMonth() {
    this.rangeDates[1] = new Date();
    let makeDate = new Date(new Date());
    this.rangeDates[0] = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
    console.log(this.rangeDates);
  }
  onSelect(event: Event) {
    // console.log(event);
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  private getStatisticsByDate() {
    this.statisticsService
      .getJewelryByBarcodeAndDate(
        this.id,
        this.formatDate(this.rangeDates[0]),
        this.formatDate(this.rangeDates[1])
      )
      .subscribe(data => {
        this.dataForLineChart = this.calculateLineChart(data);
      });
  }
}
