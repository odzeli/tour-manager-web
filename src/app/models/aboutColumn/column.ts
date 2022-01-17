import {ColumnValueType} from '../enums/column-value-type'

export class Column {
  id: string;
  name: string;
  code: string;
  tourId: string;
  valueType: ColumnValueType;
  sortOrder: number;
  displayInGrid: boolean;
  displayInPersonalPanel: boolean;
  sharpNotation: string;
}
