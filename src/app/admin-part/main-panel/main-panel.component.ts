import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from '../../services/app-header-service';

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

  constructor(private appHeaderService: AppHeaderService) { }

  ngOnInit(): void {
    const headerState = {pageName: "Панель администратора", extraButtons: [''] }
    this.appHeaderService.setData(headerState);
  }

  toggleMenuItem(menuItem: MenuItem){
    switch(menuItem){
      case MenuItem.columnSettings:
        this.allColumnSettingsOpened = true;
        this.columnSettingsOpened = false;
        break;
    }
  }

  addNewColumn(){
        this.allColumnSettingsOpened = false;
        this.columnSettingsOpened = true;
  }

}
export enum MenuItem {
  columnSettings
}
