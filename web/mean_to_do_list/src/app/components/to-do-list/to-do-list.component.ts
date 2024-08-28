import { Component, Injectable, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/Task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  notStartedTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.allTasks = res.map((element: any) => ({
        title: element.title,
        label: element.label,
        id: element._id,
        status: element.status,
      }));
      this.filterTasksByStatus();
    });
  }

  filterTasksByStatus(): void {
    this.notStartedTasks = this.allTasks.filter(
      (task) => task.status === 'Not started'
    );
    this.inProgressTasks = this.allTasks.filter(
      (task) => task.status === 'In progress'
    );
    this.doneTasks = this.allTasks.filter((task) => task.status === 'Done');
  }

  getTaskFromId(id: string): Task {
    const task = this.allTasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  countTaskWithSpecificStatus(status: string): number {
    return this.allTasks.filter((task) => task.status === status).length;
  }

  drop(event: CdkDragDrop<Task[]>, status: string): void {
    const previousStatus = event.previousContainer === event.container;

    if (previousStatus) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskPositions(event.container.data);
    } else {
      const task = this.getTaskFromId(event.item.element.nativeElement.id);
      if (task && task.status !== status) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        task.status = status;
        this.taskService.updateTask(task.id, task).subscribe(() => {
          this.filterTasksByStatus();
        });
      }
    }
  }

  deleteTask(taskToDelete: any) {
    console.log('task to delete :', taskToDelete);
    this.taskService.deleteTask(taskToDelete).subscribe(
      () => {
        this.allTasks = this.allTasks.filter((t) => t.id !== taskToDelete.id);
        this.filterTasksByStatus();
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }

  updateTaskPositions(tasks: Task[]): void {
    tasks.forEach((task, index) => {
      task.position = index;
      this.taskService.updateTask(task.id, task).subscribe();
    });
  }
}
