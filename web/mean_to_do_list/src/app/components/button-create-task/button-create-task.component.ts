import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCreateTaskComponent } from '../dialog-create-task/dialog-create-task.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-button-create-task',
  templateUrl: './button-create-task.component.html',
  styleUrls: ['./button-create-task.component.css'],
})
export class ButtonCreateTaskComponent {
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(DialogCreateTaskComponent);
  }
}
