import { Component, Injectable, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/models/Task';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  allTasks: Task[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      console.log('test');
      res.forEach((element: any) => {
        let task: Task = {
          title: element.title,
          label: element.label,
          id: element._id,
          status: element.status,
        };
        console.log(task);
        this.allTasks.push(task);
      });
    });
  }

  getTaskFromId(id: string): Task {
    const task = this.allTasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  countTaskWithSpecificStatus(status: string) {
    return this.allTasks.filter((task) => task.status === status).length;
  }

  drop($event: any, status: string) {
    let task = this.getTaskFromId($event.item.element.nativeElement.id);
    if (task.status !== status) {
      task.status = status;
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.taskService.getTasks();
      });
    }
  }
}
