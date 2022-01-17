import { ColumnValueType } from "../enums/column-value-type";

export class ColumnValue {
  public columnValueType: ColumnValueType;
  public columnCode: string;
  public value: any;
}
