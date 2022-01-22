import { ColumnValueType } from '../enums/column-value-type'

export class StandardColumn {
  id: string;
  name: string;
  code: string;
  valueType: ColumnValueType;
  sortOrder: number;
  displayInGrid: boolean;
  displayInPersonalPanel: boolean;
}
