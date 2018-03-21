import { Injectable } from '@angular/core';
import ResourceInterface from '../ResourceInterface';
import Resource from '../domain/Resource';

@Injectable()
export class FilmService implements ResourceInterface {

  searchItem(item: String): Resource {
    throw new Error("Method not implemented.");
  }
  getItem(item: Resource): Resource {
    throw new Error("Method not implemented.");
  }
  getItems(): Resource[] {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
