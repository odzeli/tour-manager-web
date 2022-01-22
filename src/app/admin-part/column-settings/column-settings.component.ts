import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandardColumn } from '../../models/aboutColumn/standard-column';
import { ColumnValueType } from '../../models/enums/column-value-type';
import { ColumnService } from '../../services/column-service';

@Component({
  selector: 'app-column-settings',
  templateUrl: './column-settings.component.html',
  styleUrls: ['./column-settings.component.scss']
})
export class ColumnSettingsComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  columnValueType = ColumnValueType;

  constructor(private formBuilder: FormBuilder, private columnService: ColumnService) {
  }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      columnName: ['', Validators.required],
      columnCode: ['', Validators.required],
      columnType: [ColumnValueType, Validators.required],
      // shouldDisplay: [Boolean, Validators.required],
    })

  }

  save() {
    if (this.firstFormGroup.valid) {
      let standardColumn = new StandardColumn();
      standardColumn.name = this.firstFormGroup.value.columnName;
      standardColumn.code = this.firstFormGroup.value.columnCode;
      standardColumn.valueType = this.firstFormGroup.value.columnType;
      standardColumn.displayInGrid = true;
      this.columnService.createStandardColumn(standardColumn).subscribe(
        res => {
          if(res == 1) alert("Колонка успешно сохранена");
        }
      );
    }
  }

}
