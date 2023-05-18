import { DatePipe } from '@angular/common';
import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ColumnValueType } from 'src/app/models/enums/column-value-type';


@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {

  /** Overrides the changingValue and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.changingValue = this._value = x;
  }
  private _value = '';
  @Input() columnValueType: ColumnValueType;

  @Input() dateValue: Date;

  /** Form model for the input. */
  changingValue = '';
  dateChangingValue: FormControl;
  columnTypesEnum = ColumnValueType;
  subscribtions: Subscription[] = [];

  pipe: DatePipe = new DatePipe('ru-RU');

  constructor(
    @Optional() @Host() public popover: SatPopover,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => {
          this.changingValue = this.value || ''
        });
    }

    //initialize part for Datepicker mode
    this.dateChangingValue = new FormControl(this.dateValue);
    if (this.columnValueType == ColumnValueType.dateTime) {
      let subscribtion = this.dateChangingValue.valueChanges.subscribe((dateValue) => {
        this.dateValue = new Date(dateValue);
      });
      this.subscribtions.push(subscribtion);
    }
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    if (this.popover) {
      const date = this.dateValue;
      if (this.columnValueType == ColumnValueType.dateTime) this.popover.close(date);
      else this.popover.close(this.changingValue);
    }
  }

  onCancel(): void {
    if (this.popover) {
      this.popover.close();
    }
  }

}
