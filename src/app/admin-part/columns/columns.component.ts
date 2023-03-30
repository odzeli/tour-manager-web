import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { StandardColumn } from '../../models/aboutColumn/standard-column';
import { ColumnService } from '../../services/api/column-service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  standardColumns: StandardColumn[];

  constructor(private columnService: ColumnService) { }

  ngOnInit(): void {
    this.columnService.standardColumns().subscribe(
      res => {
        this.standardColumns = res;
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.standardColumns, event.previousIndex, event.currentIndex);
  }

}
