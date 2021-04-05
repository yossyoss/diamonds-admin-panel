import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material";
@Component({
  selector: "filters-row",
  templateUrl: "./filters-row.component.html",
  styleUrls: ["./filters-row.component.scss"]
})
export class FiltersRowComponent implements OnInit {
  // @ViewChild("picker") picker;
  // @ViewChild("picker2") picker2;

  endDate: Date; //= new Date();
  startDate: Date; //= new Date(new Date().getFullYear(), 0, 1);

  @Output() dateChange = new EventEmitter<Object>();
  constructor() {}
  ngOnInit() {
    this.setDate(12);
    // this.dateChange.emit({ from: this.startDate, to: this.endDate });
  }
  onselect(date?: MatDatepickerInputEvent<Date>, action?: string) {
    if (action) {
      if (action === "to") {
        this.endDate = date.value;
      } else {
        this.startDate = date.value;
      }
    }
    this.checkDateAndReplace();
  }
  checkDateAndReplace() {
    if (this.endDate < this.startDate) {
      const temp = this.endDate;
      this.endDate = this.startDate;
      this.startDate = temp;
    }
  }
  setDate(prev: number) {
    this.endDate = new Date();
    switch (prev) {
      case 999:
        this.dateChange.emit({ from: this.startDate, to: this.endDate });
        break;
      case 7:
        this.startDate = new Date(
          this.endDate.getFullYear(),
          this.endDate.getMonth(),
          this.endDate.getDate() - 7
        );
        break;
      case 3:
      case 1:
        this.startDate = new Date(
          this.endDate.getFullYear(),
          this.endDate.getMonth() - prev,
          this.endDate.getDate()
        );
        break;
      case 12:
        this.startDate = new Date(
          this.endDate.getFullYear() - 1,
          this.endDate.getMonth(),
          this.endDate.getDate()
        );
        break;
    }
    this.dateChange.emit({ from: this.startDate, to: this.endDate });
  }
}
