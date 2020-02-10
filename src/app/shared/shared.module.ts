import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./loader/loader.component";
import { AreaComponent } from "./widgets/area/area.component";
import { HighchartsChartModule } from "highcharts-angular";
import { CardComponent } from "./widgets/card/card.component";
import { MatIconModule } from "@angular/material";
import { PieComponent } from "./widgets/pie/pie.component";
import { BarComponent } from "./widgets/bar/bar.component";

@NgModule({
  declarations: [
    LoaderComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    BarComponent
  ],
  imports: [CommonModule, HighchartsChartModule, MatIconModule],
  exports: [
    LoaderComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    BarComponent
  ]
})
export class SharedModule {}
