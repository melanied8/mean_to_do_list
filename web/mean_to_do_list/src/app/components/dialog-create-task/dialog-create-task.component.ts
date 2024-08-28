import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LabelService } from 'src/app/services/label/label.service';
import { TaskService } from 'src/app/services/task/task.service';
import { Label } from 'src/models/Label';
import { Task } from 'src/models/Task';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-dialog-create-task',
  templateUrl: './dialog-create-task.component.html',
  styleUrls: ['./dialog-create-task.component.css'],
})
export class DialogCreateTaskComponent {
  allLabels: Label[] = [];
  constructor(
    public dialog: MatDialog,
    private labelService: LabelService,
    private taskService: TaskService
  ) {
    this.labelService.getLabels().subscribe((res) => {
      res.forEach((element: any) => {
        let label: Label = {
          title: element.title,
        };
        this.allLabels.push(label);
      });
    });
  }
  profileForm = new FormGroup({
    title: new FormControl(''),
    label: new FormControl(''),
  });

  closeDialog() {
    this.dialog.closeAll();
  }

  onSubmit() {
    let title;
    let label;
    this.profileForm.controls['title'].value
      ? (title = this.profileForm.controls['title'].value)
      : (title = '');
    this.profileForm.controls['label'].value
      ? (label = this.profileForm.controls['label'].value)
      : (label = '');

    let newTask: Task = {
      title: title,
      status: 'Not started',
      label: label,
      id: '',
      position: 1,
    };
    this.taskService.createTask(newTask).subscribe((res) => {
      console.log('task created :', res);
      this.taskService.getTasks();
    });
  }
}
