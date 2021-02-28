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
  storeToId = {};
  dataForLineChart: any;
  dataForStoreLineChart: any;
  dataForSalesMenLineChart: any;
  options = {
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
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
      this.loadAllStores();
      this.getStatisticsByDate();
    }
  }
  selectData(event) {
    const index = event.element._index;
    const label = this.dataForLineChart.labels[index];
    if (label !== "None")
      this.router.navigate(["/statistics/jewellery", label]);
  }
  selectStorData(event) {
    const index = event.element._index;
    const label = this.dataForStoreLineChart.labels[index];
    const id = this.storeToId[label];
    if (label !== "None")
      this.router.navigate([`/statistics/stores/${id}/name`, label]);
  }

  private getStatisticsByDate() {
    this.statisticsService
      .getTopJewelry(
        this.manufacturerId,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(data => {
        this.dataForLineChart = this.utilityService.calculateBarChart(data);
      });
  }
  private loadAllStores() {
    this.statisticsService
      .getAllStoresVideos(
        this.manufacturerId,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(list => {
        list.forEach(e => {
          //making this shit do to sorting problem of matirial tables
          if (e.store) {
            e.storename = e.store.name;
            e.storecity = e.store.city;
            e.storestate = e.store.state;
            this.storeToId[e.store.name] = e.store.id;
          }
        });
        this.dataForStoreLineChart = this.utilityService.calculateStoresBarChart(
          list
        );
        this.dataForSalesMenLineChart = this.utilityService.calculateStoresBarChart(
          [
            {
              jewelryDTO: null,
              day: "11/22/20",
              total: 7,
              store: {
                id: 13,
                name: "Chris Martin",
                city: "Tucson",
                state: "AZ",
                latitude: 32.2212831,
                longitude: -110.9603379
              },
              storename: "Chris Martin",
              storecity: "Tucson",
              storestate: "AZ"
            },
            {
              jewelryDTO: null,
              day: "12/18/20",
              total: 15,
              store: {
                id: 25,
                name: "Zlatan Ibrahimovic",
                city: "Altamonte Springs",
                state: "FL",
                latitude: 28.666781,
                longitude: -81.3773282
              },
              storename: "Zlatan Ibrahimovic",
              storecity: "Altamonte Springs",
              storestate: "FL"
            },
            {
              jewelryDTO: null,
              day: "1/19/21",
              total: 12,
              store: {
                id: 39,
                name: "Roger Federer",
                city: "Littleton",
                state: "CO",
                latitude: 39.6096087,
                longitude: -105.0367206
              },
              storename: "Roger Federer",
              storecity: "Littleton",
              storestate: "CO"
            },
            {
              jewelryDTO: null,
              day: "2/7/21",
              total: 26,
              store: {
                id: 15,
                name: "Emilio Rodrigues",
                city: "Sacramento",
                state: "CA",
                latitude: 0,
                longitude: 0
              },
              storename: "Emilio Rodrigues",
              storecity: "Sacramento",
              storestate: "CA"
            },
            {
              jewelryDTO: null,
              day: "2/7/21",
              total: 10,
              store: {
                id: 20,
                name: "Mark Dundee",
                city: "Greenwood",
                state: "IN",
                latitude: 34.819568,
                longitude: -86.9441695
              },
              storename: "Mark Dundee",
              storecity: "Greenwood",
              storestate: "IN"
            }
          ],
          "Top Sales People:"
        );
      });
  }
}
