import { ColumnValueType } from "../enums/column-value-type";

export class ColumnValue {
  public valueType: ColumnValueType;
  public columnCode: string;
  public value: any;
}
