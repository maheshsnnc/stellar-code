import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductionSite, Site } from 'src/app/models/site';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit, OnChanges {
  @Input() site: Site;

  productionSites: ProductionSite[];


  displayedColumns: string[] = ['month', 'poa', 'ac'];
  dataSource = new MatTableDataSource<PvWattOutput>([]);
  view = [1100, 350];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Months';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  months: string[] = [];
  chartData: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#7aa3e5', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private dataService: DataService) { }

  async ngOnInit() {
    this.months = this.getMonths();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (!this.site) {
      return;
    }
    this.productionSites = await this.dataService.getProductionSitesData();
    let selectedProdSite = this.productionSites.find(x => x.id == this.site.id);
    if (selectedProdSite) {
      let result = await this.dataService.getPVWattsData(selectedProdSite);
      this.chartData = result.outputs;
      this.setChartData(result.outputs);
      console.log(result);
    };
  }

  private setChartData(resultData: any) {
    let poaData = [];
    let acData = [];
    let tableData: PvWattOutput[] = [];
    for (let i = 0; i < 12; i++) {
      poaData.push({
        "name": this.months[i],
        "value": resultData.poa_monthly[i]
      });
      acData.push({
        "name": this.months[i],
        "value": resultData.ac_monthly[i]
      });
      tableData.push({
        monthName: this.months[i],
        poaMonthly: resultData.poa_monthly[i],
        acMonthly: resultData.ac_monthly[i],
        isTotal: false
      });
    };

    const totalPoa = tableData.reduce((acc, row) => acc + row.poaMonthly, 0);
    const totalAc = tableData.reduce((acc, row) => acc + row.acMonthly, 0);
    tableData.push({
      monthName: "TOTAL:",
      poaMonthly: totalPoa,
      acMonthly: totalAc,
      isTotal: true
    });
    this.chartData = [
      {
        "name": "POA Monthly",
        "series": poaData
      },
      {
        "name": "Ac Monthly",
        "series": acData
      }
    ];
    this.dataSource = new MatTableDataSource<PvWattOutput>(tableData);

  }

  getMonths() {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(2000, i).toLocaleString('default', { month: 'long' });
      months.push(month);
    }
    return months;
  }
}

export interface PvWattOutput {
  monthName: string;
  poaMonthly: number;
  acMonthly: number;
  isTotal: boolean;
}

