import {TourExpense} from './tour-expense'

export class TourExpenseGroup {
  public id: number;
  public sum: number;
  public groupName: string;
  public tourExpenses: TourExpense[];
}
