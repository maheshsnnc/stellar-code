import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Site } from 'src/app/models/site';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent implements OnInit, OnChanges {
  @Input() site: Site;
  parameterList: string[] = ['Irradiance', 'Ambient Temperature', 'Wind Speed'];
  chartData: any[] = [];
  view = [1100, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date (Last 7 days)';
  yAxisLabel: string = 'Data values';
  timeline: boolean = true;
  currentWeather: any;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  selectedParameter: any;

  constructor(private dataService: DataService) {

  }

  async onSelectionChange(event: MatSelectChange) {
    await this.refreshChart(event.value);
  }

  async refreshChart(parameter: string) {
    let result: any[] = await this.dataService.getHistoricalData(this.site.latitude, this.site.longitude);
    this.chartData = result.filter(x => x.name == parameter);
  }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (!this.site) {
      return;
    }
    this.currentWeather = await this.dataService.getWeatherData(this.site.latitude, this.site.longitude);
    this.selectedParameter = "Irradiance";
    await this.refreshChart(this.selectedParameter)
  }
}
