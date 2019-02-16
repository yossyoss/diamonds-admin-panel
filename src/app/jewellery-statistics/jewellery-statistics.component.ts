import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StatisticsService } from "@app/_services";
@Component({
  templateUrl: "./jewellery-statistics.component.html",
  styleUrls: ["./jewellery-statistics.component.css"]
})
export class JewelleryStatisticsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  id: number;

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
  }
}
