import { Component } from '@angular/core';
import { AppHeaderService } from './services/app-header-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
appHeaderState: AppHeaderState;
  constructor(private appHeaderService: AppHeaderService) {

  }

  ngOnInit() {
    this.appHeaderService.selectData().subscribe(
      res => {
        this.appHeaderState = res;
      }
    );
  }
}

export class AppHeaderState {
  pageName: string;
  extraButtons: string[];
}
