import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "filters-row",
  templateUrl: "./filters-row.component.html",
  styleUrls: ["./filters-row.component.css"]
})
export class FiltersRowComponent implements OnInit {
  @ViewChild("picker") picker;
  @ViewChild("picker2") picker2;
  constructor() {}

  ngOnInit() {}
  onselect() {
    console.log(picker);
  }
}
