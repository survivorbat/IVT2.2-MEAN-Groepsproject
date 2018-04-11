import { Injectable } from '@angular/core';
import ResourceInterface from '../ResourceInterface';
import Resource from '../domain/Resource';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BASE_URL = environment.serverurl + "/api/chatresources"
@Injectable()
export class ChatresourceService implements ResourceInterface {

  httpOptions(): Object {
    return {headers: new HttpHeaders({ 'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN') })};
  }

  getItem(item): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item, this.httpOptions());
  }
  getItems(): Observable<Resource[]> {
    return this.http.get<Resource[]>(BASE_URL, this.httpOptions());
  }
  deleteItem(title: string): void {
    this.http.delete(BASE_URL+'/'+title, this.httpOptions());
  }
  addItem(item: Resource): void {
    this.http.post(BASE_URL, item, this.httpOptions()).subscribe(res => console.log(res));
  }
  constructor(private http: HttpClient) { }

}
