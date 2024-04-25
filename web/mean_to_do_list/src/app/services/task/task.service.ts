import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createTask(task: Task) {
    this.http.put<any>(this.apiUrl, task).subscribe((res) => {
      console.log(res);
    });
  }

  updateTask(taskId: string, updates: Task): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${taskId}`, updates);
  }
}
