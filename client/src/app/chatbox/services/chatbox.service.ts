import { Injectable } from '@angular/core';
import Chatbox from '../domain/Chatbox';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "http://localhost:5000/api/chatboxes"
@Injectable()
export class ChatboxService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Chatbox[]> {
    return this.http.get<Chatbox[]>(BASE_URL)
  }
  addItem(item: Chatbox): Observable<Chatbox> {
    return this.http.post<Chatbox>(BASE_URL, item)
  }
  deleteItem(item: Chatbox | number): Observable<Chatbox> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${BASE_URL}/${id}`;

    return this.http.delete<Chatbox>(url);
  }

}
