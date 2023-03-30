import { ColumnValueType } from "../enums/column-value-type";

export class ColumnValue {
  public valueType: ColumnValueType;
  public columnCode: string;
  public columnName: string;
  public value: any;
}
