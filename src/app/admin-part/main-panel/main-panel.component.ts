import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '../../services/app-header-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  columnSettingsOpened: boolean;
  allColumnSettingsOpened: boolean;
  opened: boolean = true;
  menuItem = MenuItem;

  //menus routing
  columnsComponent: string = '/admin-part/columns'
  columnStepperComponent: string = '/admin-part/columns/stepper'
  importComponent: string = '/admin-part/import/stepper'

  constructor(
    public router: Router,
    private appHeaderService: AppHeaderService
  ) { }

  ngOnInit(): void {
    const headerState = { pageName: "Панель администратора", extraButtons: [''] }
    this.appHeaderService.setData(headerState);
  }

  toggleMenuItem(menuItem: MenuItem) {
    switch (menuItem) {
      case MenuItem.columnSettings:
        this.router.navigate([this.columnsComponent]);
        break;
      case MenuItem.import:
        this.router.navigate([this.importComponent]);
        break;
    }
  }

  addNewColumn() {
    this.router.navigate([this.columnStepperComponent]);
  }

}
export enum MenuItem {
  columnSettings = 0,
  import = 1
}
