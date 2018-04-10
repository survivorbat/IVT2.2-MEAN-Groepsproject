import { Injectable } from '@angular/core';
import Chatbox from '../domain/Chatbox';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.serverurl + "/api/chatboxes"

@Injectable()
export class ChatboxService {

  constructor(private http: HttpClient) { }

  httpOptions(): Object {
    return {headers: new HttpHeaders({ 'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN') })};
  }

  getItems(): Observable<Chatbox[]> {
    return this.http.get<Chatbox[]>(BASE_URL, this.httpOptions())
  }
  updateItem(item: Chatbox): Observable<any> {
    const url = `${BASE_URL}/${item.id}`;
    return this.http.patch(url, item, this.httpOptions());
  }
  addItem(item: Chatbox): Observable<Chatbox> {
    return this.http.post<Chatbox>(BASE_URL, item, this.httpOptions())
  }
  deleteItem(item: Chatbox | number): Observable<Chatbox> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${BASE_URL}/${id}`;

    return this.http.delete<Chatbox>(url, this.httpOptions());
  }

}
