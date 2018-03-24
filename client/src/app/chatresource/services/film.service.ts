import { Injectable } from '@angular/core'
import ResourceInterface from '../ResourceInterface'
import Resource from '../domain/Resource'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

const BASE_URL = "https://avancinema.herokuapp.com/api/films"
@Injectable()
export class FilmService implements ResourceInterface {
  getItem(item: Resource): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item.id)
  }
  getItems(): Observable<Resource[]> {
   return this.http.get<Resource[]>(BASE_URL)
  }
  constructor(private http: HttpClient) { }

}
