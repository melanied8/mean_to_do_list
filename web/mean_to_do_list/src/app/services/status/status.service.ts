import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/Status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'http://localhost:3000/api/status';
  constructor(private http: HttpClient) {}

  getLabels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
