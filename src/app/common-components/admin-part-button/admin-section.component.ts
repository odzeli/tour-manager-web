import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss']
})
export class AdminSectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToAdmin() {
    this.router.navigate(['admin-part']);
  }

}
