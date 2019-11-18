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
  lat: number = 51.673858;
  lng: number = 7.815982;

  // dataSource: any = new MatTableDataSource();
  from: string;
  to: string;
  dataToExport: any[] = [];
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
      lat: $event.coords.lat,
      lng: $event.coords.lng,
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
        let arr = [];
        arr.push(
          list.map(item => item.store)
        );
        console.log(arr);
        // list.forEach(e => {
        //   if (e.store) {
        //     e.storename = e.store.name;
        //     e.storecity = e.store.city;
        //     e.storestate = e.store.state;
        //     let dataToExport = {
        //       storename: e.storename,
        //       storecity: e.storecity,
        //       storestate: e.storestate,
        //       total: e.total
        //     };
        //     this.dataToExport.push(dataToExport);
        //   }
        // });
        // this.dataSource.data = list;
        // this.dataSource.sort = this.sort;
      });
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: true
    }
  ];
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
