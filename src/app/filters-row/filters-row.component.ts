import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material";
@Component({
  selector: "filters-row",
  templateUrl: "./filters-row.component.html",
  styleUrls: ["./filters-row.component.scss"]
})
export class FiltersRowComponent implements OnInit {
  @ViewChild("picker") picker;
  @ViewChild("picker2") picker2;
  // startDate;
  endDate = new Date();
  startDate = new Date(
    this.endDate.getFullYear(),
    this.endDate.getMonth(),
    this.endDate.getDate() - 7
  );

  @Output() dateChange = new EventEmitter<any>();
  constructor() {}
  onselect(date?: any, action?: string) {
    if (action) {
      if (action === "to") {
        this.endDate = date.value;
      } else {
        this.startDate = date.value;
      }
    }
    this.checkDateAndReplace();
    this.dateChange.emit({ from: this.startDate, to: this.endDate });
  }
  checkDateAndReplace() {
    if (this.endDate < this.startDate) {
      const temp = this.endDate;
      this.endDate = this.startDate;
      this.startDate = temp;
    }
  }
  setPrevWeek() {
    this.endDate = new Date();
    this.startDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth(),
      this.endDate.getDate() - 7
    );
    this.onselect();
  }
  setPrevMonth(prev) {
    this.endDate = new Date();
    this.startDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth() - prev,
      this.endDate.getDate()
    );
    this.onselect();
  }
  setPrevYear() {
    this.endDate = new Date();
    this.startDate = new Date(
      this.endDate.getFullYear() - 1,
      this.endDate.getMonth(),
      this.endDate.getDate()
    );
    this.onselect();
  }
  ngOnInit() {}
}
