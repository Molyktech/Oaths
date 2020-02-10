import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChartsService {
  constructor() {}
  bigChart() {
    return [
      {
        name: "January",
        data: [502, 635, 809, 1402, 3634, 5268]
      },
      {
        name: "February",
        data: [502, 635, 809, 1402, 3634, 5268]
      },
      {
        name: "November",
        data: [502, 635, 809, 1402, 3634, 5268]
      },
      {
        name: "December",
        data: [502, 635, 809, 1402, 3634, 5268]
      }
    ];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [
      {
        name: "Change of Name",
        y: 61.41,
        sliced: true,
        selected: true
      },
      {
        name: "General Form",
        y: 11.84
      },
      {
        name: "Declaration of Marraige",
        y: 10.12
      },
      {
        name: "Age Declaration",
        y: 7.61
      }
    ];
  }
  barChart() {
    return [
      {
        name: "Age",
        data: [
          49.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4
        ]
      },
      {
        name: "Marriage",
        data: [
          83.6,
          78.8,
          98.5,
          93.4,
          106.0,
          84.5,
          105.0,
          104.3,
          91.2,
          83.5,
          106.6,
          92.3
        ]
      },
      {
        name: "General",
        data: [
          48.9,
          38.8,
          39.3,
          41.4,
          47.0,
          48.3,
          59.0,
          59.6,
          52.4,
          65.2,
          59.3,
          51.2
        ]
      },
      {
        name: "Name",
        data: [
          42.4,
          33.2,
          34.5,
          39.7,
          52.6,
          75.5,
          57.4,
          60.4,
          47.6,
          39.1,
          46.8,
          51.1
        ]
      }
    ];
  }
}
