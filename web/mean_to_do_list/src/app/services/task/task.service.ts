import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createTask(task: Task): Observable<any> {
    return this.http.put<any>(this.apiUrl, task);
  }

  updateTask(taskId: string, updates: Task): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${taskId}`, updates);
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${task.id}`);
  }
}
