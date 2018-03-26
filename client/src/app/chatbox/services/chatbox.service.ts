import { Injectable } from '@angular/core';
import Chatbox from '../../domain/Chatbox';
import { HttpClient } from '@angular/common/http';

const BASE_URL = "https://groepsprojectivt2.herokuapp.com/api/chatboxes"
@Injectable()
export class ChatboxService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Chatbox[]> {
    return this.http.get<Chatbox[]>(BASE_URL)
  }

}
