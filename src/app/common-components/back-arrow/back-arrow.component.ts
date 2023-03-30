import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  public back() {
    const baseUrl = this.location.isCurrentPathEqualTo('');
    const dashboardUrl = this.location.isCurrentPathEqualTo('dashboard')
    if (!baseUrl && !dashboardUrl)
      this.location.back();
  }

  ngOnInit(): void {
  }

}
