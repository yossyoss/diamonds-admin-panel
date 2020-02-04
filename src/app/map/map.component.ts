import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MouseEvent } from "@agm/core";
import {
  StatisticsService,
  UtilityService,
  AuthenticationService
} from "@app/_services";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, OnDestroy {
  // google maps zoom level
  zoom: number = 5;

  // initial center position for the map
  latitude: number;
  longitude: number;
  loadAllStoresIntervalVar: any;
  // dataSource: any = new MatTableDataSource();
  manufacturerId: string;
  markers: marker[];
  infoWindowOpened = null;
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private statisticsService: StatisticsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.manufacturerId = this.authenticationService.currentUserValue.manufacturerId;
    console.log("this.manufacturerId", this.manufacturerId);
    this.loadAllStores();
    this.loadAllStoresIntervalVar = setInterval(() => {
      this.loadAllStoresInterval();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.loadAllStoresIntervalVar) {
      clearInterval(this.loadAllStoresIntervalVar);
    }
  }

  lastSelectedInfoWindow: any;
  // clickedMarker(infoWindow: any) {
  //   if (infoWindow == this.lastSelectedInfoWindow) {
  //     return;
  //   }
  //   if (this.lastSelectedInfoWindow != null) {
  //     try {
  //       this.lastSelectedInfoWindow.close();
  //     } catch {} //in case if you reload your markers
  //   }
  //   this.lastSelectedInfoWindow = infoWindow;
  // }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     latitude: $event.coords.lat,
  //     longitude: $event.coords.lat
  //   });
  // }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log("dragEnd", m, $event);
  // }
  private loadAllStoresInterval() {
    this.statisticsService
      .getAllStoresPerManufacturer(this.manufacturerId)
      .subscribe((list2: Array<marker>) => {
        list2.map(item => {
          const marker = this.markers.filter(
            marker => marker.store.id === item.store.id
          );
          marker[0].total = item.total;
        });
      });
  }

  private loadAllStores() {
    this.statisticsService
      .getAllStoresPerManufacturer(this.manufacturerId)
      .subscribe((list: Array<marker>) => {
        this.markers = list;
        setTimeout(() => {
          this.latitude = 37.243347;
          this.longitude = -101.361668;
        }, 1000);
      });
  }

  // markers: marker[] = [
  //   {
  //     lat: 51.673858,
  //     lng: 7.815982,
  //     label: "A",
  //     draggable: true
  //   },
  //   {
  //     lat: 51.373858,
  //     lng: 7.215982,
  //     label: "B",
  //     draggable: false
  //   },
  //   {
  //     lat: 51.723858,
  //     lng: 7.895982,
  //     label: "C",
  //     draggable: true
  //   }
  // ];
}

// just an interface for type safety.
interface marker {
  day: string;
  store: {
    latitude: number;
    longitude: number;
    id: number;
    city: string;
    name: string;
  };
  total: number;
}
