import { Injectable } from '@angular/core';
import ResourceInterface from '../ResourceInterface';
import Resource from '../domain/Resource';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OvService implements ResourceInterface {

  getItem(item: Resource): Observable<Resource> {
    throw new Error("Method not implemented.");
  }
  getItems(): Observable<Resource[]> {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
