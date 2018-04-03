import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Message from '../domain/Message';
import { environment } from '../../../environments/environment';
import Chatbox from '../../chatbox/domain/Chatbox';
import { Observable } from 'rxjs/Observable';

const BASE_URL = environment.serverurl + "/api/chatmessages"
@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  getMessages(chatbox: number): Observable<Message[]> {
    return this.http.get<Message[]>(BASE_URL+'/'+chatbox,{
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    });
  }

  add(message: Message, chatbox: Chatbox){
    this.http.post(BASE_URL+'/'+chatbox.id,{text: message.text, chatbox: chatbox.id},{
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    })
  }

  remove(message: Message){
    this.http.delete(BASE_URL+'/'+message.id,{
      headers: {
        'Authorization': 'Bearer '+window.localStorage.getItem('API_TOKEN'),
      }
    })
  }
}
