import { Component, OnInit } from "@angular/core";
import {
  StatisticsService,
  UtilityService,
  AuthenticationService
} from "@app/_services";
import { trigger, style, animate, transition } from "@angular/animations";
import { Router } from "@angular/router";
@Component({
  selector: "app-top-jewelry",
  templateUrl: "./top-jewelry.component.html",
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate("500ms", style({ transform: "translateX(0)", opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translateX(0)", opacity: 1 }),
        animate("500ms", style({ transform: "translateX(100%)", opacity: 0 }))
      ])
    ])
  ],
  styleUrls: ["./top-jewelry.component.css"]
})
export class TopJewelryComponent implements OnInit {
  id: number;
  checked: boolean = true;
  dataForLineChart: any;
  dataForPieChart: any;
  options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          stacked: true
        }
      ]
    },
    label: {
      display: false
    }
  };
  // rangeDates: Date[] = [];
  from: string;
  to: string;
  manufacturerId: string;
  videoLink: string;
  invalidDates: Array<Date>;
  constructor(
    private statisticsService: StatisticsService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
  }

  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.getStatisticsByDate();
    }
  }
  selectData(event) {
    const index = event.element._index;
    const label = this.dataForPieChart.labels[index];
    console.log(label);
    this.router.navigate(["/statistics/jewellery", label]);
  }

  private getStatisticsByDate() {
    this.statisticsService
      .getTopJewelry(
        this.manufacturerId,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(data => {
        this.dataForPieChart = this.utilityService.calculatePieChart(data);
        this.dataForLineChart = this.utilityService.calculateBarChart(data);
      });
  }
}
