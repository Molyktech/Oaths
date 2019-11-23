import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @Input() data = [];
  Highcharts = Highcharts;
  chartOptions: {};
  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Affidavits in January, 2019'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: this.data
        }
      ]
    };

    HC_exporting(Highcharts);
    Highcharts.setOptions({
      colors: [
        // "#24CBE5",
        // "#50B432",
        // "#ED561B",
        // "#6AF9C4"
        // 2
        // "#1EEFAC",
        // "#FAD010",
        // "#B57CFC",
        // "#F65B03"
        '#349d63',
        '#EB0C4C',
        '#F9B219',
        '#37B1D4'
      ]
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
