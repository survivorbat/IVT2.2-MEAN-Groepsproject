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
    return this.http.get<Resource>(BASE_URL+'/'+item.title)
  }
  getItems(): Observable<Resource[]> {
    return this.http.get<Resource[]>(BASE_URL)
  }
  deleteItem(title: string): void {
    this.http.delete(BASE_URL+'/'+title)
  }
  addItem(item: Resource): void {
    this.http.post(BASE_URL, item)
  }
  constructor(private http: HttpClient) { }

}
