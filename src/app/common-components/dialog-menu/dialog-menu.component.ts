import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'dialog-menu',
  templateUrl: 'dialog-menu.component.html',
  styleUrls: ['dialog-menu.component.scss']
})
export class DialogMenuComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogMenuComponent>
  ) { }

  closeDialog(result): void {
    this.dialogRef.close(result);
  }

}
