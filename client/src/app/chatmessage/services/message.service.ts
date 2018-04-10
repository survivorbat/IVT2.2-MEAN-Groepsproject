import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Message from '../domain/Message';
import { environment } from '../../../environments/environment';
import Chatbox from '../../chatbox/domain/Chatbox';
import { Observable } from 'rxjs/Observable';
import Resource from '../../chatresource/domain/Resource';

const BASE_URL = environment.serverurl + "/api/chatmessages"
@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  httpOptions(): Object {
    return {headers: new HttpHeaders({ 'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN') })};
  }

  getMessages(chatbox: number): Observable<Message[]> {
    return this.http.get<Message[]>(BASE_URL+'/chatbox/'+chatbox,this.httpOptions());
  }

  add(message: Message, chatbox: number){
    return this.http.post(BASE_URL,{text: message.text, chatbox: chatbox},this.httpOptions())
  }

  remove(message: number){
    this.http.delete(BASE_URL+'/'+message,this.httpOptions()).subscribe(res => console.log(res))
  }
}
