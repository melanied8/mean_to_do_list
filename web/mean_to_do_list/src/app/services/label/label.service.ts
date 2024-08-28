import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Label } from 'src/app/models/Label';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  private apiUrl = 'http://localhost:3000/api/labels';
  constructor(private http: HttpClient) {}

  getLabels(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createLabel(label: Label): Observable<any> {
    return this.http.post<any>(this.apiUrl, label);
  }

  updateLabel(labelId: string, updates: Label): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/labels/${labelId}`, updates);
  }
}
