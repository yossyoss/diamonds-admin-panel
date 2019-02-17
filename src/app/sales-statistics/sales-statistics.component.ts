import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatisticsService } from "@app/_services";

import { MessageService } from "primeng/api";
@Component({
  templateUrl: "./sales-statistics.component.html",
  styleUrls: ["./sales-statistics.component.css"]
})
export class SalesStatisticsComponent implements OnInit {
  data: any;
  dataForLineChart: any;
  salesMan: any;
  options = {
    legend: {
      display: false
    }
  };
  id: number;
  rangeDates: Date;
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.statisticsService.getSalesPersonDataById(this.id).subscribe(data => {
      this.data = this.calculatePieChart(data);
      this.dataForLineChart = this.calculateLineChart(data);
    });
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

    this.salesMan = data[0].user;
    console.log(this.salesMan);
    this.data = this.calculatePieChart(data);
    this.dataForLineChart = this.calculateLineChart(data);
  }
  update(event: Event) {
    this.data = []; //create new data
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  calculatePieChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }
      ]
    };
    data.forEach(user => {
      if (newObj[user.jewelryDTO.barcode]) {
        newObj[user.jewelryDTO.barcode] += user.total;
      } else {
        newObj[user.jewelryDTO.barcode] = user.total;
      }
    });
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
        let color = this.dynamicColors();
        primengObj.datasets[0].backgroundColor.push(color);
        primengObj.datasets[0].hoverBackgroundColor.push(color);
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
}
// To-do
// 1.adding array of colors
// 2.adding logic to display just relevant graph
// 3.filters
// 4.make it responsive by adding class