import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label, Color } from "ng2-charts";
import { DataService } from "src/app/shared/data.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private _dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.getDataChart();
    this.getDataChart1();
  }
  dataTopProductsChart: any = [];
  labelTopProductsChart: any = [];
  dataTopProductsChart1: any = [];
  labelTopProductsChart1: any = [];
  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartLabels: Label[] = this.labelTopProductsChart;
  barChartLabels1: Label[] = this.labelTopProductsChart1;
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.dataTopProductsChart, label: "Toal Products" }
  ];
  barChartData1: ChartDataSets[] = [
    { data: this.dataTopProductsChart1, label: "Toal Money" }
  ];
  barChartColors: Color[] = [
    {
      borderColor: "#006699",
      backgroundColor: "#006699"
    }
  ];
  barChartColors1: Color[] = [
    {
      borderColor: "rgb(00,33,00)",
      backgroundColor: "#330D66"
    }
  ];

  getDataChart() {
    const uri = `admin/getProductDataChart`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        // this.dataTopProductsChart = data.data;
        for (let item of data.data) {
          this.dataTopProductsChart.push(item.total_products);
          this.labelTopProductsChart.push(item.product_name);
        }
        console.log(this.dataTopProductsChart);
        this.dataTopProductsChart.push(0);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getDataChart1() {
    const uri = `admin/getUserDataChart`;

    this._dataService.get(uri).subscribe(
      (data: any) => {
        // this.dataTopProductsChart = data.data;
        for (let item of data.data) {
          this.dataTopProductsChart1.push(item.total_money);
          this.labelTopProductsChart1.push(item.name);
        }
        console.log(this.dataTopProductsChart);
        this.dataTopProductsChart1.push(0);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
