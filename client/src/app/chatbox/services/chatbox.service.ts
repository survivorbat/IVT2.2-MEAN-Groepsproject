import { Injectable } from '@angular/core';
import Chatbox from '../domain/Chatbox';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.serverurl + "/api/chatboxes"
@Injectable()
export class ChatboxService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Chatbox[]> {
    return this.http.get<Chatbox[]>(BASE_URL)
  }
  updateItem(item: Chatbox): Observable<any> {
    const url = `${BASE_URL}/${item.id}`;
    return this.http.patch(url, item);
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
