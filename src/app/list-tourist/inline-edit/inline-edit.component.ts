import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

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
  @Input() datePicker: boolean;

  @Input()
  get dateValue(): Date { return this._dateValue; }
  set dateValue(x: Date) {
    this.dateChangingValue = this._dateValue = x;
  }
  private _dateValue = new Date();

  isDatePicker: boolean = false;

  /** Form model for the input. */
  changingValue = '';
  dateChangingValue: Date;

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.changingValue = this.value || '');
    }
    console.log(this.datePicker);
    this.isDatePicker = this.datePicker;
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.changingValue);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
