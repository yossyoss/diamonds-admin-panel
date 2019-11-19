import { Component, OnInit, ViewChild } from "@angular/core";
import { MouseEvent } from "@agm/core";
import { StatisticsService, UtilityService } from "@app/_services";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  latitude: number = 35.36915165;
  longitude: number = -80.7223175609166;

  // dataSource: any = new MatTableDataSource();
  from: string;
  to: string;
  dataToExport: any[] = [];
  markers: marker[];
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private statisticsService: StatisticsService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {}
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lat,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  onDateChange(e) {
    if (e) {
      this.from = e.from;
      this.to = e.to;
      this.loadAllStores();
    }
  }
  private loadAllStores() {
    this.statisticsService
      .getAllStoresVideos(
        1,
        this.utilityService.convertDate(this.from),
        this.utilityService.convertDate(this.to)
      )
      .subscribe(list => {
        const arr = list.map(item => item.store);
        console.log(arr);
        this.markers = arr;
        if (arr.length) {
          this.latitude = arr[0].latitude;
          this.longitude = arr[0].longitude;
        }
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
  latitude: number;
  longitude: number;
  label?: string;
  city?: string;
  name?: string;

  draggable: boolean;
}
