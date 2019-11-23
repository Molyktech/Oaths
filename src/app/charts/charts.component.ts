import { Component, OnInit } from "@angular/core";
import { ChartsService } from "../services/charts.service";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"]
})
export class ChartsComponent implements OnInit {
  bigChart = [];
  cards = [];
  pieChart = [];
  barChart = [];
  constructor(private chartService: ChartsService) {}

  ngOnInit() {
    this.bigChart = this.chartService.bigChart();
    this.cards = this.chartService.cards();
    this.pieChart = this.chartService.pieChart();
    this.barChart = this.chartService.barChart();
  }
}
