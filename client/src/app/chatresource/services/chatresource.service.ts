import { Injectable } from '@angular/core';
import ResourceInterface from '../ResourceInterface';
import Resource from '../domain/Resource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "https://groepsprojectivt2.herokuapp.com/api/chatresources"
@Injectable()
export class ChatresourceService implements ResourceInterface {

  getItem(item: Resource): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item.title)
  }
  getItems(): Observable<Resource[]> {
    return this.http.get<Resource[]>(BASE_URL)
  }
  deleteItem(item: Resource): void {
    this.http.delete(BASE_URL+'/'+item.title)
  }
  addItem(item: Resource): void {
    this.http.post(BASE_URL, item)
  }
  constructor(private http: HttpClient) { }

}