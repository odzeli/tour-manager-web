import { Component, Input, OnInit } from '@angular/core';
import { TourExpense } from '../models/tour-expenses/tour-expense';
import { TourService } from '../services/api/tour-service';
import { TourExpenseGroup } from '../models/tour-expenses/tour-expense-group';

@Component({
  selector: 'app-tour-expenses',
  templateUrl: './tour-expenses.component.html',
  styleUrls: ['./tour-expenses.component.scss']
})
export class TourExpensesComponent implements OnInit {

  @Input() tourId: string

  tourService: TourService;

  expenseGroups: TourExpenseGroup[];

  constructor(
    tourService: TourService
  ) {
    this.tourService = tourService;
  }

  ngOnInit(): void {

    this.tourService.tourExpenses(this.tourId)
      .subscribe(data => {
        this.expenseGroups = data;
        this.expenseGroups = [
          { groupName: "Группа Али", id: 1, tourExpenses: [{ expenseName: "Музей", amount: 1200 } as TourExpense, { expenseName: "Катера", amount: 15000 }] as TourExpense[] } as TourExpenseGroup,
          { groupName: "Группа Юсупа", id: 2, tourExpenses: [{ expenseName: "Обед", amount: 9000 } as TourExpense, { expenseName: "Уазы", amount: 7000 } as TourExpense] as TourExpense[] } as TourExpenseGroup]
      })
  }


  public addExpense(id: number): void {
    let group = this.expenseGroups.find(g => g.id == id);
    group.tourExpenses.push({ expenseName: "Новый расход" } as TourExpense)
  }


  public addExpenseGroup() {
    let maxId = Math.max(...this.expenseGroups.map(g => g.id));
    this.expenseGroups.push({ groupName: "Новая группа", id: maxId + 1, tourExpenses: [{ expenseName: "Новый расход" } as TourExpense] } as TourExpenseGroup);
  }


}
