import { Injectable } from '@angular/core';
import ResourceInterface from '../ResourceInterface';
import Resource from '../domain/Resource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.serverurl + "/api/chatresources"
@Injectable()
export class ChatresourceService implements ResourceInterface {

  getItem(item: Resource): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item.title, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  getItems(): Observable<Resource[]> {
    return this.http.get<Resource[]>(BASE_URL, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  deleteItem(title: string): void {
    this.http.delete(BASE_URL+'/'+title, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  addItem(item: Resource): void {
    this.http.post(BASE_URL, item, {
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }
  constructor(private http: HttpClient) { }

}
