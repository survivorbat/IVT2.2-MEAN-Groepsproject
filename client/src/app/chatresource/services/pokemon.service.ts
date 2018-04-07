import { Injectable } from '@angular/core'
import ResourceInterface from '../ResourceInterface'
import Resource from '../domain/Resource'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"
@Injectable()
export class PokemonService implements ResourceInterface {
  getItem(item: Resource): Observable<Resource> {
    return this.http.get<Resource>(BASE_URL+'/'+item.id);
  }
  getItems(): Observable<Resource[]> {
   return this.http.get<Resource[]>(BASE_URL).map((res: any) => {
     return res.results.map((resource: any) => {
      let mappedresource = new Resource()
      mappedresource.title=resource.name
      mappedresource.url=resource.url
      mappedresource.description=resource.name
      return mappedresource;
     })
   })
  }
  constructor(private http: HttpClient) { }

}
