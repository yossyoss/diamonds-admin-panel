import { Component, OnInit } from "@angular/core";
import { StatisticsService, UtilityService } from "@app/_services";
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: "app-top-jewelry",
  templateUrl: "./top-jewelry.component.html",
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  styleUrls: ["./top-jewelry.component.css"]
})
export class TopJewelryComponent implements OnInit {
  id: number;
  checked: boolean = true;
  dataForLineChart: any;
  dataForPieChart: any;
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

  ngOnInit() {}

  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.getStatisticsByDate();
    }
  }

  private getStatisticsByDate() {
    this.statisticsService
      .getTopJewelry(
        1,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(data => {
        this.dataForPieChart = this.utilityService.calculatePieChart(data);
        this.dataForLineChart = this.utilityService.calculateLineChart(data);
      });
  }
}
