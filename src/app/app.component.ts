import { Component, OnInit } from '@angular/core';
import { Site } from './models/site';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stellar-ui';

  selectedItem: Site;

  listItems: Site[] = [];

  handleClick(selectedItem: Site) {
    this.selectedItem = selectedItem;
  }

  constructor(private dataService: DataService) {

  }

  async ngOnInit() {
    await this.getSiteDetails();
    if (this.listItems.length > 0) {
      this.selectedItem = this.listItems[0];
    }
  }

  private async getSiteDetails() {
    this.listItems = await this.dataService.getSiteDetails();
  }
}
