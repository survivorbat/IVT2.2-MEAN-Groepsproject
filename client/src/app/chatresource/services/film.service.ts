import { Injectable } from '@angular/core'
import ResourceInterface from '../ResourceInterface'
import Resource from '../domain/Resource'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../environments/environment';

const BASE_URL = "https://avancinemalite.herokuapp.com/api/films"
@Injectable()
export class FilmService implements ResourceInterface {

  httpOptions(): String {
    return {headers: new HttpHeaders({ 'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN') })};
  }

  getItem(item: Resource): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item.id, this.httpOptions());
  }
  getItems(): Observable<Resource[]> {
   return this.http.get<Resource[]>(BASE_URL, this.httpOptions());
  }
  constructor(private http: HttpClient) { }

}
